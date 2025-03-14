export const formatPrice = (amount) => {
    if (amount) {
        if (typeof amount === 'string') {
            amount = parseFloat(amount);
        }
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return '0 ₫';
};