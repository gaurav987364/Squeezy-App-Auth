export const formatReadableDate = (isoDate: string): string => {
    const date = new Date(isoDate);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    return date.toLocaleString('en-US', options);
};


//generate random avatar
type Avatar = {
  initials: string;
  backgroundColor: string;
};

export const generateAvatarFromName = (name: string): Avatar => {
  const colors = [
    '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444',
    '#EC4899', '#14B8A6', '#6366F1', '#F97316', '#84CC16'
  ];

  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const hash = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const backgroundColor = colors[hash % colors.length];

  return {
    initials,
    backgroundColor,
  };
};


//check expirey url time
export const isExpired = (timestamp: number): boolean => {
  return Date.now() > timestamp;
};


//check for token is valid or expire
export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return true;
  return Date.now() > parseInt(expiry);
};

// Decode the JWT token
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
