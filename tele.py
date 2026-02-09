import sys
import requests
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton,
    QTableWidget, QTableWidgetItem, QMessageBox, QHeaderView, QHBoxLayout, QFileDialog
)
from PySide6.QtCore import Qt

class TelegramDownloader(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Telegram File Downloader")
        self.setGeometry(300, 300, 750, 500)
        self.setStyleSheet("""
            QWidget {
                font-family: Arial;
                font-size: 12pt;
            }
            QLineEdit, QTableWidget, QPushButton {
                font-size: 11pt;
            }
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border-radius: 5px;
                padding: 5px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
            QTableWidget {
                border: 1px solid #ccc;
            }
        """)

        layout = QVBoxLayout()

        # مدخل التوكن
        token_layout = QHBoxLayout()
        token_label = QLabel("Bot Token:")
        token_layout.addWidget(token_label)
        self.token_input = QLineEdit()
        token_layout.addWidget(self.token_input)
        layout.addLayout(token_layout)

        # زر جلب الملفات
        self.get_files_btn = QPushButton("جلب الملفات")
        layout.addWidget(self.get_files_btn)
        self.get_files_btn.clicked.connect(self.get_files)

        # جدول الملفات
        self.file_table = QTableWidget()
        self.file_table.setColumnCount(5)
        self.file_table.setHorizontalHeaderLabels(["الاسم", "ID", "الحجم (بايت)", "نسخ رابط التحميل", "تحميل"])
        self.file_table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        layout.addWidget(self.file_table)

        self.setLayout(layout)
        self.files = []

    def get_files(self):
        token = self.token_input.text().strip()
        if not token:
            QMessageBox.warning(self, "خطأ", "ادخل توكن البوت")
            return

        url = f"https://api.telegram.org/bot{token}/getUpdates"
        try:
            resp = requests.get(url).json()
        except Exception as e:
            QMessageBox.critical(self, "خطأ", f"فشل الاتصال بالبوت:\n{e}")
            return

        self.files.clear()
        self.file_table.setRowCount(0)
        for update in resp.get("result", []):
            msg = update.get("message")
            if msg and "document" in msg:
                doc = msg["document"]
                self.files.append(doc)
                row = self.file_table.rowCount()
                self.file_table.insertRow(row)
                self.file_table.setItem(row, 0, QTableWidgetItem(doc["file_name"]))
                self.file_table.setItem(row, 1, QTableWidgetItem(doc["file_id"]))
                self.file_table.setItem(row, 2, QTableWidgetItem(str(doc.get("file_size", 0))))

                # زر نسخ الرابط
                copy_btn = QPushButton("نسخ رابط التحميل")
                copy_btn.clicked.connect(lambda _, d=doc: self.copy_download_link(d))
                self.file_table.setCellWidget(row, 3, copy_btn)

                # زر تحميل الملف بالاسم الأصلي
                download_btn = QPushButton("تحميل")
                download_btn.clicked.connect(lambda _, d=doc: self.download_file(d))
                self.file_table.setCellWidget(row, 4, download_btn)

    def copy_download_link(self, doc):
        token = self.token_input.text().strip()
        file_id = doc["file_id"]
        get_file_url = f"https://api.telegram.org/bot{token}/getFile?file_id={file_id}"
        try:
            resp = requests.get(get_file_url).json()
            file_path = resp["result"]["file_path"]
            download_link = f"https://api.telegram.org/file/bot{token}/{file_path}"
            QApplication.clipboard().setText(download_link)
            QMessageBox.information(self, "تم النسخ", f"رابط التنزيل المباشر للملف '{doc['file_name']}' تم نسخه للحافظة")
        except Exception as e:
            QMessageBox.critical(self, "خطأ", f"فشل الحصول على رابط:\n{e}")

    def download_file(self, doc):
        token = self.token_input.text().strip()
        file_id = doc["file_id"]
        file_name = doc["file_name"]

        # اختر مكان حفظ الملف
        save_path, _ = QFileDialog.getSaveFileName(self, "حفظ الملف باسم:", file_name)
        if not save_path:
            return

        try:
            # جلب file_path من Telegram
            get_file_url = f"https://api.telegram.org/bot{token}/getFile?file_id={file_id}"
            resp = requests.get(get_file_url).json()
            file_path = resp["result"]["file_path"]

            # تحميل الملف
            download_url = f"https://api.telegram.org/file/bot{token}/{file_path}"
            r = requests.get(download_url)
            r.raise_for_status()

            with open(save_path, "wb") as f:
                f.write(r.content)

            QMessageBox.information(self, "تم التحميل", f"تم حفظ الملف '{file_name}' بنجاح!")
        except Exception as e:
            QMessageBox.critical(self, "خطأ", f"فشل تحميل الملف:\n{e}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TelegramDownloader()
    window.show()
    sys.exit(app.exec())
