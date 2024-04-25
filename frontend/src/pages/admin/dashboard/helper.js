export const convertCurrencyToVietnameseFormat = value => {
  if (value < 0) return value;

  if (value > 0 && value <= 999999) return value / 1000 + "k";
  if (value >= 1000000 && value <= 999999999) return value / 1000000 + "tr";
  if (value >= 1000000000) return value / 1000000000 + "tỷ";
};

export const formatVND = amount => {
  if (!amount) return 0;
  const re = "\\d(?=(\\d{3})+$)";
  let rounding = Math.round(amount);
  return rounding.toString().replace(new RegExp(re, "g"), "$&.");
};

export const getPercentageOfAItem = (arr = [], currentIdx) => {
  const total = arr.reduce((sum, cur) => (sum += cur), 0);
  const currentItem = arr[currentIdx];

  if (!currentItem) return "";

  let totalPercent = 0;

  const percentObject = arr.reduce((result, cur, idx) => {
    const percentage = Math.round((cur * 100) / total);
    totalPercent += percentage;

    if (totalPercent < 100) {
      result[idx] = percentage;
    } else {
      totalPercent -= percentage;
      const resultTotal = Object.values(result).reduce((total, cur) => (total += cur), 0);

      const currentPercent = 100 - resultTotal;
      totalPercent += currentPercent;
      result[idx] = currentPercent;
    }

    return result;
  }, {});

  const currentIndexPercentage = percentObject[currentIdx];

  return `${currentIndexPercentage}%`;
};
