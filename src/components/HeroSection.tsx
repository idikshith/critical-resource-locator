export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary via-accent to-primary mb-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Hospital Integration Dashboard
        </h1>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          This dashboard acts as a centralized monitoring tool for hospitals, allowing them to view all active ambulance movements and patient details in real time. Hospitals receive live notifications about incoming patients, including their medical condition and estimated arrival time.
        </p>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed mt-4">
          By providing this information early, hospitals can prepare necessary medical teams, equipment, and treatment spaces before the patient arrives. This efficient coordination reduces waiting time, streamlines emergency admission, and enhances the overall patient experience.
        </p>
      </div>
      
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
    </div>
  );
};
