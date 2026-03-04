import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Play, ArrowRight, Search, Crown, Gift, Clock } from "lucide-react";
import { ItemLogo } from "@/components/details/ItemLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import blenderMd from "@/pages/courses/BlenderCourse.md?raw";
import blenderFreeExtMd from "@/pages/courses/BlenderFreeExt.md?raw";
import d5RenderFreeMd from "@/pages/courses/D5RenderFree.md?raw";
import blenderFreeIntMd from "@/pages/courses/BlenderFreeInt.md?raw";

const CourseCard = ({ course, index, t }: { course: any, index: number, t: any }) => {
  return (
    <div
      className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/5 to-primary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 geometric-pattern opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500" />

      {/* Card Header with Badge */}
      <div className={`relative z-20 py-4 px-8 ${course.isComingSoon ? 'bg-amber-500/5' : (course.isPaid ? 'bg-primary/5' : 'bg-green-500/5')
        } border-b border-border/50 flex justify-center items-center`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${course.isComingSoon ? 'from-amber-500/10 via-amber-500/5 to-amber-500/10' : (course.isPaid ? 'from-primary/10 via-primary/5 to-primary/10' : 'from-green-500/10 via-green-500/5 to-green-500/10')
          } opacity-50`} />
        <span className={`relative z-10 flex items-center gap-2 ${course.isComingSoon ? 'text-amber-600' : (course.isPaid ? 'text-primary' : 'text-green-600')
          } text-sm font-bold`}>
          {course.isComingSoon ? (
            <Clock className="w-4 h-4 fill-amber-500/20" />
          ) : course.isPaid ? (
            <Crown className="w-4 h-4 fill-primary/20" />
          ) : (
            <Gift className="w-4 h-4 fill-green-500/20" />
          )}
          {course.typeLabel || (course.isPaid ? t("common.paid") : t("common.free"))}
        </span>
      </div>

      <div className="relative p-8 flex flex-col h-full z-10 items-center text-center">
        <div className="mb-4">
          <div className="w-16 h-16 rounded-[1rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner border border-primary/5 overflow-hidden p-2">
            <ItemLogo
              imageName={course.imageName}
              fallbackIcon={Play}
              className="w-full h-full object-contain"
              iconClassName="w-8 h-8 text-primary"
            />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {course.title}
        </h3>
        <p className="text-muted-foreground mb-8 leading-relaxed flex-1">
          {course.description}
        </p>

        <Button variant="outline" className="w-full mt-auto" asChild>
          <Link to={course.link}>
            {t("courses.preview.cta_details")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Courses = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const bRead = useReadme({ localContent: blenderMd, id: "blender", isCourse: true });
  const bExtFreeRead = useReadme({ localContent: blenderFreeExtMd, id: "blender-free-ext", isCourse: true });
  const d5FreeRead = useReadme({ localContent: d5RenderFreeMd, id: "d5-render-free", isCourse: true });
  const bIntFreeRead = useReadme({ localContent: blenderFreeIntMd, id: "blender-free-int", isCourse: true });

  const courses = [
    {
      id: "blender",
      title: bRead.titleContent || "",
      description: bRead.shortDesc || bRead.overviewContent || bRead.longDesc || "",
      featured: true,
      link: "/courses/blender",
      isPaid: bRead.isPaid,
      isComingSoon: bRead.isComingSoon,
      typeLabel: bRead.typeLabel,
      imageName: "BlenderCourse"
    },
    {
      id: "blender-free-ext",
      title: bExtFreeRead.titleContent || "",
      description: bExtFreeRead.shortDesc || bExtFreeRead.overviewContent || bExtFreeRead.longDesc || "",
      featured: false,
      link: "/courses/blender-free-ext",
      isPaid: bExtFreeRead.isPaid,
      isComingSoon: bExtFreeRead.isComingSoon,
      typeLabel: bExtFreeRead.typeLabel,
      imageName: "BlenderFreeExt"
    },
    {
      id: "d5-render-free",
      title: d5FreeRead.titleContent || "",
      description: d5FreeRead.shortDesc || d5FreeRead.overviewContent || d5FreeRead.longDesc || "",
      featured: false,
      link: "/courses/d5-render-free",
      isPaid: d5FreeRead.isPaid,
      isComingSoon: d5FreeRead.isComingSoon,
      typeLabel: d5FreeRead.typeLabel,
      imageName: "D5RenderFree"
    },
    {
      id: "blender-free-int",
      title: bIntFreeRead.titleContent || "",
      description: bIntFreeRead.shortDesc || bIntFreeRead.overviewContent || bIntFreeRead.longDesc || "",
      featured: false,
      link: "/courses/blender-free-int",
      isPaid: bIntFreeRead.isPaid,
      isComingSoon: bIntFreeRead.isComingSoon,
      typeLabel: bIntFreeRead.typeLabel,
      imageName: "BlenderFreeInt"
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
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
                  className="h-14 px-12 rounded-2xl bg-card border-border/50 focus:ring-primary/20 transition-all text-lg shadow-sm text-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 bg-card/80 backdrop-blur-md shadow-card min-h-[400px]">
          <div className="container mx-auto px-4">
            {filteredCourses.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {filteredCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} t={t} />
                ))}
              </div>
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
