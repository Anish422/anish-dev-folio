export const projects = [
  {
    title: "SecurAid",
    when: "Jan 2025",
    stack: [
      "React", "Node.js", "Express", "MongoDB", "Docker", "Nginx", 
      "Google Cloud VM", "AWS S3", "Google OAuth", "Notistack"
    ],
    summary: "Secure file-sharing web app with multi-file uploads, VirusTotal malware scans, and real-time dashboard visualizations.",
    bullets: [
      "Deployed with Docker Compose behind Nginx reverse proxy; HTTPS via Let's Encrypt; automated production builds with Bash.",
      "OTP-based, time-limited file access (Nodemailer + MongoDB TTL); iframe-based secure viewing preventing direct S3 exposure.",
      "Role-based access and real-time notifications for scan results and access control feedback."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/UTSCC09/project-securaid" }
    ],
    category: "Web",
    featured: true
  },
  {
    title: "gameday.",
    when: "Sep 2024",
    stack: ["Python", "Flask", "RapidAPI (NFL)", "REST", "JSON"],
    summary: "Dynamic NFL statistics web app to compare real-time team stats and past matchups with an intuitive UI.",
    bullets: [
      "Integrated data from 1,250+ NFL games across five years for robust modeling and trend analysis.",
      "RESTful APIs + JSON parsing for streamlined backend processing and responsive UI."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Anish422/gameday." }
    ],
    category: "Data",
    featured: true
  },
  {
    title: "Linear Regression Model",
    when: "Oct 2023",
    stack: [
      "Python", "NumPy", "pandas", "scikit-learn", "Matplotlib", "Flask"
    ],
    summary: "Multi-variable regression trained on 10,000+ data points with >95% accuracy and a small Flask UI for results/insights.",
    bullets: [
      "Built visual insights (Seaborn/Matplotlib) and interactive results page.",
      "Achieved >95% prediction accuracy through feature engineering and model optimization."
    ],
    links: [],
    category: "Data",
    featured: false
  },
  {
    title: "Android Application",
    when: "Jan 2024",
    stack: [
      "Java", "Android Studio", "Firebase", "Mockito", "JIRA"
    ],
    summary: "Scrum-led Android app with real-time Firebase backend and high-quality UI/UX; ensured user stories met sprint goals.",
    bullets: [
      "Implemented real-time data synchronization with Firebase Realtime Database.",
      "Followed Agile methodology with sprint planning and retrospectives.",
      "Comprehensive testing suite with Mockito for unit testing."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/LuLuMarMar/b07Project" }
    ],
    category: "Android",
    featured: false
  }
];

export const projectCategories = [
  "All",
  "Web", 
  "Data",
  "Android",
  "Security"
];