#!/bin/bash

API_URL="http://localhost:3000/api"
MAX_RETRIES=5
RETRY_COUNT=0

echo "Waiting for API to start..."
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if curl -s "$API_URL/health" > /dev/null; then
    echo "API is ready!"
    break
  fi
  echo "API not ready yet... waiting 2 seconds."
  sleep 2
  RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "API failed to start in time."
  exit 1
fi

echo "==================================="
echo "Running API Tests"
echo "==================================="

# Smoke Test
echo "-> [Smoke Test] Verificando healthcheck..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/health")
if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "FAIL: Smoke Test falhou. Status $HTTP_STATUS"
  exit 1
fi
echo "SUCCESS: Smoke Test passou!"

# Sanity Test
echo "-> [Sanity Test] Verificando listar produtos..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/products")
if [ "$HTTP_STATUS" -ne 200 ]; then
  echo "FAIL: Sanity Test falhou. Status $HTTP_STATUS"
  exit 1
fi
echo "SUCCESS: Sanity Test passou!"

# Regression Test
echo "-> [Regression Test] Verificando bloqueio de login inválido (deve retornar 401)..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"email":"invalid@example.com", "password":"wrong"}' "$API_URL/login")
if [ "$HTTP_STATUS" -ne 401 ]; then
  echo "FAIL: Regression Test falhou. Esperado 401, recebido $HTTP_STATUS"
  exit 1
fi
echo "SUCCESS: Regression Test passou!"

echo "==================================="
echo "All tests passed successfully!"
exit 0
