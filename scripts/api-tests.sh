#!/bin/bash

# =============================================================
# Nexus E-commerce API — Test Suite
# Smoke (CT-01, CT-02) | Sanity (CT-03, CT-04) | Regression (CT-05, CT-06)
# =============================================================

API_URL="http://localhost:3000/api"
PASS=0
FAIL=0
MAX_RETRIES=10
RETRY_COUNT=0

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "⏳ Aguardando a API inicializar..."
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if curl -sf "$API_URL/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✔ API está pronta!${NC}"
    break
  fi
  echo "   API ainda não está pronta... tentativa $((RETRY_COUNT+1))/$MAX_RETRIES (aguardando 2s)"
  sleep 2
  RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo -e "${RED}✘ ERRO FATAL: API não inicializou a tempo. Pipeline abortada.${NC}"
  exit 1
fi

# -----------------------------------------------------------
# Helper function
# -----------------------------------------------------------
run_test() {
  local ID=$1
  local TYPE=$2
  local DESC=$3
  local EXPECTED=$4
  local STATUS=$5

  if [ "$STATUS" -eq "$EXPECTED" ]; then
    echo -e "${GREEN}  ✔ PASS${NC} [${TYPE}] ${ID}: ${DESC} (HTTP ${STATUS})"
    PASS=$((PASS+1))
  else
    echo -e "${RED}  ✘ FAIL${NC} [${TYPE}] ${ID}: ${DESC} — Esperado HTTP ${EXPECTED}, recebido HTTP ${STATUS}"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "==================================================="
echo "       NEXUS API — SUITE DE TESTES AUTOMATIZADOS   "
echo "==================================================="

# -----------------------------------------------------------
# 🟡 SMOKE TESTS — Verificação das funções vitais
# -----------------------------------------------------------
echo ""
echo -e "${YELLOW}--- SMOKE TESTS ---${NC}"

# CT-01: Healthcheck endpoint deve retornar 200
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/health")
run_test "CT-01" "SMOKE" "Healthcheck /api/health retorna HTTP 200" 200 "$STATUS"

# CT-02: Endpoint de produtos deve estar acessível (HTTP 200)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/products")
run_test "CT-02" "SMOKE" "Endpoint /api/products está acessível (HTTP 200)" 200 "$STATUS"

# -----------------------------------------------------------
# 🔵 SANITY TESTS — Validação rápida de funcionalidades específicas
# -----------------------------------------------------------
echo ""
echo -e "${YELLOW}--- SANITY TESTS ---${NC}"

# CT-03: Login com credenciais válidas deve retornar 200
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nexus.com","password":"admin123"}' \
  "$API_URL/login")
run_test "CT-03" "SANITY" "Login com credenciais válidas retorna HTTP 200" 200 "$STATUS"

# CT-04: Endpoint de ofertas deve retornar 200 e dados válidos
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/offers")
run_test "CT-04" "SANITY" "Endpoint /api/offers retorna HTTP 200" 200 "$STATUS"

# -----------------------------------------------------------
# 🔴 REGRESSION TESTS — Validação ampla do sistema
# -----------------------------------------------------------
echo ""
echo -e "${YELLOW}--- REGRESSION TESTS ---${NC}"

# CT-05: Login com credenciais inválidas deve retornar 401 (não 200)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"hacker@evil.com","password":"wrong_pass"}' \
  "$API_URL/login")
run_test "CT-05" "REGRESSION" "Login inválido retorna HTTP 401 (proteção de autenticação intacta)" 401 "$STATUS"

# CT-06: Checkout com carrinho vazio deve retornar 400 (validação de negócio intacta)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"cart":[],"method":"credit_card"}' \
  "$API_URL/checkout")
run_test "CT-06" "REGRESSION" "Checkout com carrinho vazio retorna HTTP 400 (validação de negócio intacta)" 400 "$STATUS"

# -----------------------------------------------------------
# RESULTADO FINAL
# -----------------------------------------------------------
echo ""
echo "==================================================="
echo "  RESULTADO FINAL: ${PASS} passou(aram) | ${FAIL} falhou(aram)"
echo "==================================================="

if [ $FAIL -ne 0 ]; then
  echo -e "${RED}✘ Pipeline FALHOU. Corrija os testes acima antes de fazer merge.${NC}"
  exit 1
fi

echo -e "${GREEN}✔ Todos os testes passaram! Deploy liberado.${NC}"
exit 0
