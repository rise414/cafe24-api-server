const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/average-rating', (req, res) => {
  const productId = req.query.product_no; // 상품 ID 받아오기
  const averageRating = 4.5;  // 임의의 평균 별점 값
  res.json({ averageRating });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});