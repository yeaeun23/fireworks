// [min, max+1) 랜덤값 반환
export const randomNumBetween = (min, max) => {
  return Math.random() * (max + 1 - min) + min;
};
