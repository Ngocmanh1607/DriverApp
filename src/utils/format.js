const formatPrice = amount => {
  if (amount) {
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
    }
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }
  return '0 ₫';
};
const formatTime = dateStr => {
  const date = new Date(dateStr);

  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formattedTime;
};
const formatDate = dateStr => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN');
};
export {formatPrice, formatTime, formatDate};
