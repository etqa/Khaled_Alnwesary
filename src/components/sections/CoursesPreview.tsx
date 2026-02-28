import { Play, ArrowRight, Clock, Users, Gift, Crown } from "lucide-react";
import { ItemLogo } from "@/components/details/ItemLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReadme } from "@/hooks/useReadme";
import blenderMd from "@/pages/courses/BlenderCourse.md?raw";
import blenderFreeExtMd from "@/pages/courses/BlenderFreeExt.md?raw";
import d5RenderFreeMd from "@/pages/courses/D5RenderFree.md?raw";

export const CoursesPreview = () => {
  const { t } = useTranslation();

  const blender = useReadme({ localContent: blenderMd, id: "blender", isCourse: true });
  const bFreeExt = useReadme({ localContent: blenderFreeExtMd, id: "blender-free-ext", isCourse: true });
  const d5Free = useReadme({ localContent: d5RenderFreeMd, id: "d5-render-free", isCourse: true });

  const courses = [
    {
      id: "blender",
      title: blender.titleContent || "",
      description: blender.shortDesc || blender.overviewContent || blender.longDesc || "",
      link: "/courses/blender",
      isFree: false,
      imageName: "BlenderCourse"
    },
    {
      id: "blender-free-ext",
      title: bFreeExt.titleContent || "",
      description: bFreeExt.shortDesc || bFreeExt.overviewContent || bFreeExt.longDesc || "",
      link: "/courses/blender-free-ext",
      isFree: true,
      imageName: "BlenderFreeExt"
    },
    {
      id: "d5-render-free",
      title: d5Free.titleContent || "",
      description: d5Free.shortDesc || d5Free.overviewContent || d5Free.longDesc || "",
      link: "/courses/d5-render-free",
      isFree: true,
      imageName: "D5RenderFree"
    },
  ];

  return (
    <section className="py-20 bg-card/40 backdrop-blur-sm shadow-sm border-b border-border/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t("courses.preview.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("courses.page.hero_title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("courses.page.hero_desc")}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="animate-fade-up group relative overflow-hidden rounded-2xl border border-border hover-lift flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm transition-all duration-300 bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Patterns */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Header with Badge */}
              <div className={`relative z-10 py-3 px-6 ${course.isFree ? 'bg-green-500/5' : 'bg-primary/5'} border-b border-border/50 flex items-center justify-center gap-2`}>
                {course.isFree ? (
                  <Gift className="w-4 h-4 text-green-600" />
                ) : (
                  <Crown className="w-4 h-4 text-primary" />
                )}
                <span className={`text-xs font-bold uppercase tracking-wider ${course.isFree ? 'text-green-600' : 'text-primary'}`}>
                  {course.isFree ? t("common.free") : t("common.paid")}
                </span>
              </div>

              <div className="relative p-8 flex flex-col items-center text-center h-full z-10">
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
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2 text-sm max-w-[250px]">
                  {course.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-center border-t border-border/40 w-full">
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">{t("courses.preview.cta_details")}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                  <Link to={course.link} className="absolute inset-0 z-20">
                    <span className="sr-only">View course details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" asChild className="rounded-xl px-12 group">
            <Link to="/courses">
              {t("courses.preview.cta_all")}
              <Play className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
