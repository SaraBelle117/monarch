export default function Avatar({ name, picture, size = 'md', type = 'user', className = ''}) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-32 h-32 text-4xl border-4 border-[#A3EBB1]',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .filter(word => !word.match(/^(Dr\.?|Mr\.?|Mrs\.?|Ms\.?)$/i))
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const colors = {
    user: 'bg-[#21B6A8]',
    professional: 'bg-[#48E58F]',
  }

  if (picture) {
    return (
      <img
        src={picture}
        alt={name}
        className={`rounded-full ${colors[type]} flex items-center justify-center text-white font-bold ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-full ${colors[type]} flex items-center justify-center text-white font-bold ${sizes[size]} ${className}`}>
      {getInitials(name)}
    </div>
  );
}