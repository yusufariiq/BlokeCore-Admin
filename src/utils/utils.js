export const formatIDR = (amount) => {
    return amount.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};

export const currency = 'Rp '
