export const projects = [
  {
    title: "OPS Brainworks",
    when: "Jan 2026",
    stack: [
      "React", "Node.js", "Express", "PostgreSQL",
      "JWT", "bcrypt", "OpenAI API"
    ],
    summary: "Full-stack collaboration platform enabling 60K+ Ontario Public Service employees to securely share ideas and turn discussions into actionable projects.",
    bullets: [
      "Implemented anonymous and authenticated participation with JWT-based auth and bcrypt encryption, fostering open dialogue and boosting engagement across the platform.",
      "Integrated OpenAI's API for NLP-driven text generation and summarization, helping users refine ideas and extract key insights from discussions."
    ],
    links: [],
    category: "Web",
    featured: true
  },
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
    title: "Junkyard CC",
    when: "Aug 2026",
    stack: [
      "JavaScript", "HTML5 Canvas", "Supabase", "localStorage", "Vercel"
    ],
    summary: "Single-player top-down time-trial racer where you build a car out of randomly drafted scrap, then race it against checkpoints, medals and your own ghost.",
    bullets: [
      "Combo tag system: every part carries tags, and three or more of a tag unlocks a set bonus — so a statistically weak part is often the correct pick and no dominant build exists.",
      "Ghost racing from a full input trace of your best run, replayed as a translucent car wearing the build that set the record — a permanent rival with no opponent AI.",
      "Persistence across five tracks (best times, medals, saved builds) with a Supabase-backed leaderboard for clean runs, plus build codes that let a friend race your time in your exact car."
    ],
    links: [
      { label: "Play now", href: "https://junkyardcc.vercel.app/" }
    ],
    category: "Game",
    featured: false
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

// Note: the Projects page derives its filter chips from the data above at
// runtime, so this list is informational only — keep it in step by hand.
export const projectCategories = [
  "All",
  "Web",
  "Data",
  "Game",
  "Android",
  "Security"
];