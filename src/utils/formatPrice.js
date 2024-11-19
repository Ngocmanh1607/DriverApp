const formatPrice = (amount) => {
    if (amount) {
        if (typeof (amount) === 'string') {
            parseInt(amount);
        }
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    else
        return 0;
};
export default formatPrice