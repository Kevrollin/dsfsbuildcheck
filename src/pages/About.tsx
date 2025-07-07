import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
// import MainLayout from "../components/layout/MainLayout";
import { ArrowRight, Code, Globe, Lightbulb, Linkedin, Lock, MessageCircle, Star, Twitter, Users } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useLoader } from "../context/LoaderContext";
import { useEffect } from "react";

const About = () => {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader("Loading About Page...");
    // Simulate loading time
    setTimeout(() => {
      hideLoader();
    }, 1500);
  }, [showLoader, hideLoader]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stepContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const benefits = [
    { icon: <Globe className="h-8 w-8 text-blue-500" />, title: "Transparency", description: "All transactions and funding decisions are publicly visible on the blockchain." },
    { icon: <Lock className="h-8 w-8 text-purple-500" />, title: "Secure & Decentralized", description: "Built on Stellar blockchain for secure, low-cost transactions with no central authority." },
    { icon: <Users className="h-8 w-8 text-green-500" />, title: "Community-Driven", description: "Projects are verified and supported by a diverse global community." },
    { icon: <Star className="h-8 w-8 text-yellow-500" />, title: "Stellar-Powered", description: "Leverages Stellar's efficient, fast, and eco-friendly blockchain technology." },
    { icon: <Lightbulb className="h-8 w-8 text-orange-500" />, title: "Impactful & Student-Led", description: "Supporting real educational needs through student-designed solutions." },
    { icon: <Code className="h-8 w-8 text-indigo-500" />, title: "Open Source", description: "Fully transparent code that anyone can contribute to and improve." }
  ];

  const steps = [
    { 
      number: "01", 
      title: "Student submits a project", 
      description: "Students create profiles and submit their projects or funding needs with details and goals." 
    },
    { 
      number: "02", 
      title: "Project is verified and approved", 
      description: "Community reviewers and administrators verify project details and approve for funding." 
    },
    { 
      number: "03", 
      title: "Donors fund & track progress", 
      description: "Donors contribute directly to projects and receive regular progress updates." 
    }
  ];

  const team = [
    {
      name: "Kelvin Mukaria",
      role: "Project Manager & Frontend Dev",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Terry Anne",
      role: "Blockchain Developer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Cesina Muchoki",
      role: "UX/UI Designer",
      avatar: "https://randomuser.me/api/portraits/women/76.jpg"
    },
    {
      name: "Victor Kimathi",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/66.jpg"
    },
    {
      name: "Don Artello",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-30 dark:opacity-20 blur-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-400 dark:bg-purple-600" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-400 dark:bg-blue-800" />
          </div>
        </div>
        
        <div className="container relative mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-400 dark:to-indigo-300"
            variants={fadeIn}
          >
            About DSFS
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            A decentralized future for student funding starts here.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-16 md:py-24 bg-white dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              DSFS aims to revolutionize how students access funding by creating a transparent, 
              decentralized ecosystem where donors directly support educational projects. 
              We're bridging the gap between innovation and opportunity, empowering the next 
              generation of leaders through blockchain technology.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Grid */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Why Choose DSFS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="py-16 md:py-24 bg-white dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stepContainer}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={fadeIn}
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-indigo-900 rounded-xl p-8 h-full">
                  <span className="block text-4xl font-bold text-blue-500 dark:text-blue-400 mb-4">{step.number}</span>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet the Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="group"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden h-full">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                    {/* Socials */}
                    <div className="flex gap-3 mt-3">
                      <a href="#" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" aria-label="X" className="hover:text-black dark:hover:text-white transition-colors">
                        <Twitter size={20} />
                      </a>
                      <a href="#" aria-label="Discord" className="hover:text-indigo-600 transition-colors">
                        <MessageCircle size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners */}
      <motion.section 
        className="py-16 md:py-24 bg-white dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Backed By</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            <div className="w-32 md:w-40 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <img src="https://stellarcommunity.org/wp-content/uploads/2020/11/Stellar_Development_Foundation.png" alt="Stellar Development Foundation" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 md:w-40 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <div className="text-lg font-bold text-gray-400">University Partners</div>
            </div>
            <div className="w-32 md:w-40 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <div className="text-lg font-bold text-gray-400">Tech Innovators</div>
            </div>
            <div className="w-32 md:w-40 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <div className="text-lg font-bold text-gray-400">Global Educators</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-900 dark:to-indigo-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join the Decentralized Student Funding System and help shape the future of educational funding through blockchain technology.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
              asChild
            >
              <Link to="/role-selection">Join DSFS</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/submit-project">Submit a Project</Link>
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-blue-800/50 text-white hover:bg-blue-800/70"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">Contribute Code</a>
            </Button>
          </div>
        </div>
      </motion.section>
    </PageWrapper>
  );
};

export default About;
