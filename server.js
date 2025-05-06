const express = require('express');
const cors = require('cors'); // ✅ 추가
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ 모든 요청에 대해 CORS 허용

app.get('/api/average-rating', (req, res) => {
  const productId = req.query.product_no;
  const averageRating = 4.5;
  res.json({ averageRating });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
