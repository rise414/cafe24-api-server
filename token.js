require('dotenv').config();
const axios = require('axios');

const {
  CAFE24_CLIENT_ID,
  CAFE24_CLIENT_SECRET,
  CAFE24_REDIRECT_URI,
  CAFE24_MALL_ID
} = process.env;

const code = 'Y0TiSxF7HVWvJKFXsfsyEA';

const tokenUrl = `https://${CAFE24_MALL_ID}.cafe24api.com/api/v2/oauth/token`;

const auth = Buffer.from(`${CAFE24_CLIENT_ID}:${CAFE24_CLIENT_SECRET}`).toString('base64');

const qs = new URLSearchParams();
qs.append('grant_type', 'authorization_code');
qs.append('code', code);
qs.append('redirect_uri', CAFE24_REDIRECT_URI);

axios.post(tokenUrl, qs, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`
  }
})
.then(response => {
  console.log('✅ Access Token:', response.data.access_token);
  console.log('🔄 Refresh Token:', response.data.refresh_token);
  console.log('⏰ Expires In:', response.data.expires_in);
  console.log('🔑 Token Type:', response.data.token_type);
  console.log('📚 Scope:', response.data.scope);
})
.catch(error => {
  console.error('❌ Token 발급 실패:', error.response ? error.response.data : error.message);
});