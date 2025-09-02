import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

const resumeTypes = [
  {
    title: "Software Development",
    filename: "Anish Shah - Software Resume.pdf",
    description: "Focused on full-stack development, web applications, and software engineering projects.",
    highlights: ["Angular & React", ".NET & Node.js", "Database Design", "CI/CD"]
  },
  {
    title: "Data Science & Analytics", 
    filename: "Anish Shah - Data Resume.pdf",
    description: "Emphasizing data analysis, machine learning, and business intelligence work.",
    highlights: ["Python & pandas", "Machine Learning", "Power BI", "Statistical Analysis"]
  },
  {
    title: "Cybersecurity",
    filename: "Anish Shah - Cyber Resume.pdf", 
    description: "Highlighting security analysis, risk assessment, and compliance experience.",
    highlights: ["Risk Assessment", "BCP/DR", "Compliance", "Security Analysis"]
  }
];

export default function Resume() {
  const handleDownload = (filename: string) => {
    // Create download link - files should be placed in public/assets/resume/
    const link = document.createElement('a');
    link.href = `/assets/resume/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen pt-16">
      <Section
        eyebrow="Download"
        title="Resume & CV" 
        subtitle="Multiple versions of my resume tailored for different roles and industries."
        centerText
      >
        {/* Resume Downloads */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {resumeTypes.map((resume, index) => (
            <motion.div
              key={resume.title}
              className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              
              <h3 className="text-lg font-semibold mb-2">{resume.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {resume.description}
              </p>

              <div className="flex flex-wrap gap-1 justify-center mb-6">
                {resume.highlights.map((highlight) => (
                  <Badge key={highlight} className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <Button 
                onClick={() => handleDownload(resume.filename)}
                className="w-full group"
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce-subtle" />
                Download PDF
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Quick Contact */}
        <motion.div
          className="max-w-md mx-auto bg-muted/50 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-semibold mb-2">Quick Contact</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Interested in discussing opportunities?
          </p>
          <div className="space-y-2">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={`mailto:${profile.email}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                {profile.email}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                LinkedIn Profile
              </a>
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Skills Matrix */}
      <Section
        eyebrow="Technical Proficiency" 
        title="Skills Overview"
        className="bg-muted/30"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-semibold mb-4 text-primary">Languages</h3>
              <div className="space-y-2">
                {skills.languages.map((skill) => (
                  <div key={skill} className="flex justify-between items-center py-1">
                    <span className="text-sm">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-4 text-primary">Frameworks</h3>
              <div className="space-y-2">
                {skills.frameworks.slice(0, 8).map((skill) => (
                  <div key={skill} className="flex justify-between items-center py-1">
                    <span className="text-sm">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 3 ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-4 text-primary">Tools</h3>
              <div className="space-y-2">
                {skills.tools.slice(0, 8).map((skill) => (
                  <div key={skill} className="flex justify-between items-center py-1">
                    <span className="text-sm">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}