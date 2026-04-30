const resourcesDb = {
  "python": [
    { type: "website", title: "Official Python Tutorial", url: "https://docs.python.org/3/tutorial/" },
    { type: "youtube", title: "Python for Beginners (Mosh)", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" },
    { type: "website", title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" }
  ],
  "javascript": [
    { type: "website", title: "Modern JavaScript Tutorial", url: "https://javascript.info/" },
    { type: "youtube", title: "JavaScript Crash Course (Traversy Media)", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c" },
    { type: "website", title: "MDN Web Docs - JS", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
  ],
  "react": [
    { type: "website", title: "Official React Docs", url: "https://react.dev/" },
    { type: "youtube", title: "React JS Crash Course 2024", url: "https://www.youtube.com/watch?v=hQAHSlTtcmY" },
    { type: "website", title: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact" }
  ],
  "node": [
    { type: "website", title: "Node.js Official Guides", url: "https://nodejs.org/en/docs/guides/" },
    { type: "youtube", title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" }
  ],
  "nodejs": [
    { type: "website", title: "Node.js Official Guides", url: "https://nodejs.org/en/docs/guides/" },
    { type: "youtube", title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" }
  ],
  "typescript": [
    { type: "website", title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    { type: "youtube", title: "TypeScript Tutorial for Beginners", url: "https://www.youtube.com/watch?v=d56mG7DezGs" }
  ],
  "aws": [
    { type: "website", title: "AWS Cloud Practitioner Essentials", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials" },
    { type: "youtube", title: "AWS Certified Cloud Practitioner Training", url: "https://www.youtube.com/watch?v=SOTamWNgDKc" }
  ],
  "docker": [
    { type: "website", title: "Docker Get Started Guide", url: "https://docs.docker.com/get-started/" },
    { type: "youtube", title: "Docker Tutorial for Beginners", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI" }
  ],
  "kubernetes": [
    { type: "website", title: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
    { type: "youtube", title: "Kubernetes Tutorial for Beginners", url: "https://www.youtube.com/watch?v=VnvRRoH15KQ" }
  ],
  "sql": [
    { type: "website", title: "SQLBolt - Interactive SQL Lessons", url: "https://sqlbolt.com/" },
    { type: "website", title: "SQLZoo", url: "https://sqlzoo.net/" }
  ],
  "mongodb": [
    { type: "website", title: "MongoDB University", url: "https://university.mongodb.com/" },
    { type: "youtube", title: "MongoDB Crash Course", url: "https://www.youtube.com/watch?v=oSIv-E60NiY" }
  ],
  "machine learning": [
    { type: "website", title: "Fast.ai Practical Deep Learning", url: "https://www.fast.ai/" },
    { type: "youtube", title: "Machine Learning Course for Beginners", url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ" },
    { type: "pdf", title: "The Hundred-Page Machine Learning Book", url: "http://themlbook.com/wiki/doku.php" }
  ],
  "data science": [
    { type: "website", title: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
    { type: "youtube", title: "Data Science Full Course", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" }
  ],
  "tensorflow": [
    { type: "website", title: "TensorFlow Learn", url: "https://www.tensorflow.org/learn" },
    { type: "youtube", title: "TensorFlow 2.0 Complete Course", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk" }
  ],
  "pytorch": [
    { type: "website", title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" },
    { type: "youtube", title: "PyTorch for Deep Learning", url: "https://www.youtube.com/watch?v=V_xro1bcAuA" }
  ],
  "django": [
    { type: "website", title: "Django Girls Tutorial", url: "https://tutorial.djangogirls.org/" },
    { type: "youtube", title: "Django Course for Beginners", url: "https://www.youtube.com/watch?v=F5mRW0M-UGE" }
  ],
  "flask": [
    { type: "website", title: "Flask Mega-Tutorial", url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world" },
    { type: "youtube", title: "Flask Tutorial", url: "https://www.youtube.com/watch?v=Z1RJmh_OqeA" }
  ],
  "fastapi": [
    { type: "website", title: "FastAPI Documentation", url: "https://fastapi.tiangolo.com/" },
    { type: "youtube", title: "FastAPI Crash Course", url: "https://www.youtube.com/watch?v=tLKKmouUams" }
  ],
  "go": [
    { type: "website", title: "A Tour of Go", url: "https://tour.golang.org/" },
    { type: "youtube", title: "Go Programming Course", url: "https://www.youtube.com/watch?v=YS4e4q9oBaU" }
  ],
  "rust": [
    { type: "website", title: "The Rust Programming Language Book", url: "https://doc.rust-lang.org/book/" },
    { type: "youtube", title: "Rust Crash Course", url: "https://www.youtube.com/watch?v=zF34dRivLOw" }
  ],
  "git": [
    { type: "website", title: "Git Immersion", url: "https://gitimmersion.com/" },
    { type: "youtube", title: "Git & GitHub Crash Course", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
  ],
  "html": [
    { type: "website", title: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" },
    { type: "youtube", title: "HTML Full Course - Build a Website", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg" }
  ],
  "css": [
    { type: "website", title: "CSS-Tricks", url: "https://css-tricks.com/" },
    { type: "youtube", title: "CSS Crash Course for Beginners", url: "https://www.youtube.com/watch?v=yfoY53QXEnI" }
  ],
  "tailwind": [
    { type: "website", title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
    { type: "youtube", title: "Tailwind CSS Tutorial", url: "https://www.youtube.com/watch?v=lCxcTsOHrjo" }
  ]
};

module.exports = resourcesDb;
