require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

let accessToken = process.env.CAFE24_ACCESS_TOKEN;
let refreshToken = process.env.CAFE24_REFRESH_TOKEN;
const mallId = process.env.CAFE24_MALL_ID;
const clientId = process.env.CAFE24_CLIENT_ID;
const clientSecret = process.env.CAFE24_CLIENT_SECRET;

app.use(cors());

// 토큰 갱신 함수
async function refreshAccessToken() {
  try {
    const response = await axios.post(`https://${mallId}.cafe24api.com/api/v2/oauth/token`, null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    console.log('🔄 Access Token 갱신 성공:', accessToken);
    console.log('🔄 Refresh Token 갱신 성공:', refreshToken);
  } catch (error) {
    console.error('❌ 토큰 갱신 실패:', error.response ? error.response.data : error.message);
  }
}

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`https://${mallId}.cafe24api.com/api/v2/admin/products`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const prettyJson = JSON.stringify(response.data, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyJson);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.warn('🔑 토큰 만료. 갱신 시도 중...');
      await refreshAccessToken();
      res.redirect('/api/products');  // 갱신 후 다시 호출
    } else {
      console.error('❌ API 호출 실패:', error.response ? error.response.data : error.message);
      res.status(500).send('API 호출 실패');
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
