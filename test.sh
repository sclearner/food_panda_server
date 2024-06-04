#!/usr/bin/bash
for i in {1..10}
do
curl -XPOST -H "Content-type: application/json" \
    -d "{  
    \"username\": \"Viettel$i\",
    \"password\": \"VDT2024SE\",
    \"email\": \"vdt$i@viettel.com.vn\",
    \"avatarUrl\": \"https://nic.gov.vn/wp-content/uploads/2024/02/VDT2024-cover.png\"
    }" 'http://localhost:5000/api/v1/auth/register'
done