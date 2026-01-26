import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, Clock, Users, BookOpen, ArrowRight, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Courses = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: "blender",
      title: t("courses.blender.title"),
      description: t("courses.blender.desc"),
      duration: t("courses.blender.stats.hours"),
      students: t("courses.blender.stats.students"),
      type: t("courses.blender.stats.type"),
      featured: true,
      modules: [
        t("courses.blender.modules.0"),
        t("courses.blender.modules.1"),
        t("courses.blender.modules.2"),
        t("courses.blender.modules.3"),
        t("courses.blender.modules.4"),
        t("courses.blender.modules.5"),
      ],
      link: "/courses/blender",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="animate-fade-up inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Play className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
                {t("courses.page.hero_tag")}
              </span>
              <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("courses.page.hero_title")}
              </h1>
              <p className="animate-fade-up delay-200 text-lg text-muted-foreground mb-10">
                {t("courses.page.hero_desc")}
              </p>

              {/* Search Bar */}
              <div className="animate-fade-up delay-300 relative max-w-xl mx-auto group">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder={t("common.search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 ps-12 pe-4 rounded-2xl bg-card border-border/50 focus:ring-primary/20 transition-all text-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 bg-muted/30 min-h-[400px]">
          <div className="container mx-auto px-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-up max-w-5xl mx-auto rounded-3xl overflow-hidden bg-card border border-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Course Header */}
                  <div className="relative p-8 md:p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
                    <div className="absolute inset-0 geometric-pattern opacity-30" />
                    <div className="relative">
                      {course.featured && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-6">
                          <BookOpen className="w-4 h-4" />
                          {t("courses.page.main_course_badge")}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {course.title}
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                        {course.description}
                      </p>

                      <div className="flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center gap-2 text-foreground">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Users className="w-5 h-5 text-primary" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Play className="w-5 h-5 text-primary" />
                          <span>{course.type}</span>
                        </div>
                      </div>

                      <Button variant="hero" size="lg" asChild>
                        <Link to={course.link}>
                          {t("courses.preview.cta_details")}
                          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Course Modules */}
                  <div className="p-8 md:p-12">
                    <h3 className="text-xl font-bold text-foreground mb-6">{t("courses.page.content_label")}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.modules.map((module, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-4 rounded-xl bg-muted/50"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-foreground">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("common.no_results")}
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
