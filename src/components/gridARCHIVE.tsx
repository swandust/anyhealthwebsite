    const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => setSelectedZone(zoneId);
  const handleBackToLobby = () => setSelectedZone(null);

// ---- DETAIL VIEW (unchanged) ----
  if (selectedZone) {
    const zone = zones.find(z => z.id === selectedZone);
    if (!zone) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 animate-pulse" />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <button
              onClick={handleBackToLobby}
              className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">←</div>
              Back to Home
            </button>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${zone.gradient} text-white shadow-lg`}>
                  {zone.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{zone.title}</h1>
                  <p className="text-white/70 text-lg">{zone.subtitle}</p>
                  <p className="text-white/50 mt-2 text-sm">{zone.benefits}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Features & Services</h2>
                  <div className="space-y-3">
                    {zone.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-3">
                        <Calendar className="w-5 h-5" />
                        Schedule Appointment
                      </button>
                      <button className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-3">
                        <FileText className="w-5 h-5" />
                        View Records
                      </button>
                      <button className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        Contact Support
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => handlePortalRedirect(selectedZone)}
                    className={`w-full p-4 rounded-2xl bg-gradient-to-r ${zone.gradient} text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    {zone.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }