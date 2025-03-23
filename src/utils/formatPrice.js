export const formatPrice = (amount) => {
    if (amount == null || isNaN(amount)) {
        return '0 ₫';
    }

    if (typeof amount === 'string') {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return '0 ₫';
        }
        amount = parsedAmount;
    }

    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};