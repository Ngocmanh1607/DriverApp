const formatTime = dateStr => {
  const date = new Date(dateStr);

  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formattedTime;
};
export default formatTime;
