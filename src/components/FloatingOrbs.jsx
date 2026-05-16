export default function FloatingOrbs({ variant = 'default' }) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-blue w-[600px] h-[600px] -top-32 -right-32 animate-blob" />
        <div className="orb orb-purple w-[500px] h-[500px] top-1/2 -left-48 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 right-1/3 animate-blob" style={{ animationDelay: '4s' }} />
      </div>
    );
  }
  if (variant === 'subtle') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-blue w-96 h-96 -top-20 -left-20 opacity-10 animate-blob" />
        <div className="orb orb-purple w-72 h-72 bottom-0 -right-10 opacity-10 animate-blob" style={{ animationDelay: '3s' }} />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb orb-blue w-80 h-80 top-10 right-10 animate-blob" />
      <div className="orb orb-purple w-96 h-96 bottom-10 left-10 animate-blob" style={{ animationDelay: '2s' }} />
    </div>
  );
}