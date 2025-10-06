import { 
  Heart, 
  Users, 
  Shield, 
  Lightbulb,
  CheckCircle,
} from 'lucide-react';
import vision from "../assets/about.png";
import logo1 from "../assets/1.svg"


const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Patient-Centered Care',
    description: 'Every decision we make prioritizes patient outcomes and experience.'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Privacy & Security',
    description: 'Protecting patient data with enterprise-grade security and compliance.'
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Continuously advancing healthcare through cutting-edge technology.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Accessibility',
    description: 'Making quality healthcare accessible to everyone, everywhere.'
  }
];

const team = [
  {
    name: 'Mah Zhang Rong',
    role: 'Founder',
    image: 'https://i.ibb.co/Xr7Jjyd5/6246790818773974793.jpg',
    bio: 'Chemical and Biomolecular Engineering student in NTU Singapore'
  },
  {
    name: 'Wong Xuan Hua',
    role: 'Co Founder',
    image: 'https://i.ibb.co/39nHvyBf/6246790818773974794.jpg',
    bio: 'Bioengineering student in NTU Singapore'
  }
];

const milestones = [
  {
    year: '2024',
    title: 'Ideation',
    description: 'AnyHEALTH was established with a vision to revolutionize digital healthcare.'
  },
  {
    year: '2025',
    title: 'Funded by NTU Singapore',
    description: 'Idea was pitched and acquired MDT grant from Nanyang Technological University.'
  },
  {
    year: '2025',
    title: 'Piloting Stage',
    description: 'Piloting in clinics in Penang and Kuala Lumpur.'
  },
  {
    year: 'Coming Soon',
    title: 'Deployment',
    description: 'Expansion of services to more health departments and providers.'
  },
  {
    year: 'Vision',
    title: 'Virtual Hospital',
    description: 'Improving health outcomes together as a nation.'
  }
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-emerald-50 from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 animate-pulse" />
        
        <div className="text-center mb-12">
            <img
              src={logo1}
              className="mx-auto h64 w-auto drop-shadow-sm"
              style={{ objectFit: "contain" }}
            />
          </div>


        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray mb-6">
              About AnyHealth
            </h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              We're on a mission to make quality healthcare accessible to everyone, everywhere, through innovative digital solutions.
            </p>
          </div>

          
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-xl text-black/80 mb-6">
                Paper records are all too common in our nation's public health facilities: Time-consuming, non-traceable and difficult to refer patients are only some of the challenges our healthcare system faces. AnyHealth strives to create a comprehensive digital ecosystem that connects patients, 
                healthcare providers, and medical institutions seamlessly. Gone will be the days of lost medical records and fragmented care.
              </p>
              <p className="text-black/70 mb-8">
Through our innovative platform, we're breaking down 
                barriers and creating new possibilities for healthcare delivery.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#4E9A82]" />
                  <span className="text-black/80">Accessible healthcare for all</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#4E9A82]" />
                  <span className="text-black/80">Seamless provider integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#4E9A82]" />
                  <span className="text-black/80">Data-driven health insights</span>
                </div>
              </div>
            </div>
                <img
                src={vision}
                alt="vision"
                className="w-90 max-w-l mx-auto"
              />
            
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              AnyHealth believes in bridging the gap between patients and quality care form GPs, specialists, and hospitals. We want to improve healthcare accessibility, affordability, and outcomes- together, as a nation. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Journey</h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Key milestones in our mission to transform healthcare
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="backdrop-blur-xl bg-slate-50 rounded-2xl p-6 border border-emerald/20">
                      <div className="text-[#4E9A82] font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-black mb-3">{milestone.title}</h3>
                      <p className="text-black/70">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-[#4E9A82] rounded-full border-4 border-slate-900" />
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Powered by NTU's Innovation & Entrepreneurship ecosystem, AnyHealth is built by a passionate team dedicated to transforming healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#4E9A82]/30 group-hover:border-[#4E9A82] transition-colors duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto bg-gradient-to-t from-[#4E9A82]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-[#4E9A82] font-medium mb-3">{member.role}</p>
                <p className="text-white/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of the healthcare revolution. Whether you're a patient, provider, or partner, 
            there's a place for you in our ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Contact Us → mailto */}
            <a
              href="mailto:contact@anyhealth.asia"
              className="px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Partner With Us 
            </a>

            {/* Schedule Demo → Calendly */}
            <a
              href="https://calendly.com/anyhealth-sg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-full transition-all duration-300"
            >
              Schedule Demo
            </a>
          </div>


        </div>
      </section>
    </div>
  );
}


          