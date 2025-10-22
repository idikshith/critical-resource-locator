export const GPSHeroSection = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary via-accent to-primary mb-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="absolute bottom-0 right-0 w-full h-32 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-white/30"/>
          <path d="M0,80 Q300,50 600,80 T1200,80 L1200,120 L0,120 Z" fill="currentColor" className="text-white/20"/>
          <path d="M0,100 Q300,80 600,100 T1200,100 L1200,120 L0,120 Z" fill="currentColor" className="text-white/10"/>
        </svg>
      </div>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Real-Time GPS Monitoring
        </h1>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Real-time GPS monitoring is one of the key components of the system. Each ambulance is equipped with GPS-enabled IoT devices that constantly share their location data with the central server. This allows both patients and hospitals to track the ambulance's current position and estimated time of arrival.
        </p>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed mt-4">
          The feature enhances transparency and builds trust between users and service providers. It ensures continuous monitoring and enables quick decision-making in case of route changes, emergencies, or traffic diversions.
        </p>
      </div>
      
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
    </div>
  );
};
