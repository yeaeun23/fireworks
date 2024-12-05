// [min, max+1) 랜덤값 반환
export const randomNumBetween = (min, max) => {
  return Math.random() * (max + 1 - min) + min;
};

// 브라우저(사각형)의 대각선 길이 구하기
export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // √x²+y²
};
