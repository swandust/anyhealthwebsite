export default function CtaBanner() {
  return (
    <section className="py-20 grain relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0D1B4B 0%,#2D5A3D 100%)' }}>
      <div className="absolute pointer-events-none" style={{ top:'-30%',left:'-10%',width:'60vw',height:'60vw',borderRadius:'50%',background:'radial-gradient(circle,rgba(91,174,140,0.18) 0%,transparent 70%)' }} />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
        <div className="section-label text-white mb-6" style={{ fontSize:'clamp(2.5rem,5vw,5rem)' }}>
          Ready to transform<br />your healthcare operations?
        </div>
        <p className="mb-10 max-w-xl mx-auto" style={{ fontFamily:"'Inter',sans-serif",fontSize:'1.05rem',lineHeight:1.7,color:'rgba(255,255,255,0.6)' }}>
          Active sandbox regions: Selangor, Penang, and Johor Bahru. Start your free month or book a 15-minute demo today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#contact" className="btn-primary">Start Your Free Month</a>
          <a href="https://calendly.com/anyhealth-sg/30min" target="_blank" rel="noreferrer" className="btn-outline">Book a 15-Min Demo</a>
        </div>
      </div>
    </section>
  )
}
