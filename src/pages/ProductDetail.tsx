import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import EngineerSystem from "./products/EngineerSystem";
import EngineerSystemLite from "./products/EngineerSystemLite";
import FileEncryption from "./products/FileEncryption";

const ProductDetail = () => {
  const { id } = useParams();

  switch (id) {
    case "engineer-system":
      return <EngineerSystem />;
    case "engineer-system-lite":
      return <EngineerSystemLite />;
    case "file-encryption":
      return <FileEncryption />;
    default:
      return <NotFound />;
  }
};

export default ProductDetail;
