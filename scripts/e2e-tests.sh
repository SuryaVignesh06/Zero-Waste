#!/bin/bash
# Zero-Waste E2E Tests — Final version with native input setters
set -e
PASS=0; FAIL=0; TOTAL=0
log_pass() { echo "✅ PASS: $1"; PASS=$((PASS+1)); TOTAL=$((TOTAL+1)); }
log_fail() { echo "❌ FAIL: $1 — $2"; FAIL=$((FAIL+1)); TOTAL=$((TOTAL+1)); }
log_section() { echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; echo "▶ $1"; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; }

agent-browser set viewport 390 844 > /dev/null 2>&1
agent-browser open http://localhost:3000 > /dev/null 2>&1
sleep 3

has_text() {
  result=$(agent-browser eval "(function(){return document.body.textContent.includes('$1');})()" 2>/dev/null | tail -1)
  if [ "$result" = "true" ]; then return 0; else return 1; fi
}
test_scroll() {
  result=$(agent-browser eval "(function(){const m=document.querySelector('main');if(!m)return 'no-main';return 'canScroll:'+(m.scrollHeight>m.clientHeight+50);})()" 2>/dev/null | tail -1)
  if echo "$result" | grep -q "canScroll:true"; then return 0; else return 1; fi
}
# Native input setter (required for React controlled inputs)
set_input() {
  agent-browser eval "(function(){
    const inputs=Array.from(document.querySelectorAll('input[type=\"tel\"]'));
    const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
    const vals=Array.from(arguments);
    inputs.forEach((inp,i)=>{ if(vals[i]!==undefined){ setter.call(inp,vals[i]); inp.dispatchEvent(new Event('input',{bubbles:true})); } });
    return 'ok';
  })('$1')" 2>/dev/null | tail -1
}

# ============================================================
log_section "FEATURE 1: Onboarding (3 slides)"
# ============================================================
if has_text "Rescue Surplus Food"; then log_pass "Slide 1 (Rescue) renders"; else log_fail "Slide 1" "not found"; fi
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Skip'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Welcome back"; then log_pass "Onboarding → Login"; else log_fail "Login" "not loaded"; fi

# ============================================================
log_section "FEATURE 2: Login"
# ============================================================
if has_text "ZERO WASTE" && has_text "Welcome back"; then log_pass "Login screen with branding"; else log_fail "Login" "not loaded"; fi
if has_text "+91"; then log_pass "Country code +91 visible"; else log_fail "Phone input" "no +91"; fi
# Enter phone number with native setter
agent-browser eval "(function(){const i=document.querySelector('input[type=\"tel\"]');const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(i,'9876543210');i.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';})()" > /dev/null 2>&1
sleep 0.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Send OTP'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 2.5
if has_text "Verify your number"; then log_pass "Login → OTP screen"; else log_fail "OTP" "not loaded"; fi

# ============================================================
log_section "FEATURE 3: OTP Verification"
# ============================================================
if has_text "Verify your number"; then log_pass "OTP screen loads"; else log_fail "OTP" "not loaded"; fi
# Enter 4 OTP digits with native setter
agent-browser eval "(function(){const inputs=Array.from(document.querySelectorAll('input[type=\"tel\"]'));const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;['9','8','7','6'].forEach((d,i)=>{s.call(inputs[i],d);inputs[i].dispatchEvent(new Event('input',{bubbles:true}));});return 'ok';})()" > /dev/null 2>&1
sleep 2.5
if has_text "How will you use" || has_text "Normal User"; then log_pass "OTP auto-verify → Role Select"; else log_fail "OTP verify" "role select not loaded"; fi

# ============================================================
log_section "FEATURE 4: Role Selection"
# ============================================================
if has_text "Normal User"; then log_pass "User role card visible"; else log_fail "Role" "not found"; fi
if has_text "NGO"; then log_pass "NGO role card visible"; else log_fail "Role" "not found"; fi
if has_text "Meals Rescued" || has_text "Active Rescues"; then log_pass "Stats strip visible"; else log_fail "Stats" "not found"; fi
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Normal User'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 2

# ============================================================
log_section "FEATURE 5: Home Screen"
# ============================================================
if has_text "Good morning" || has_text "Arjun"; then log_pass "Home greeting visible"; else log_fail "Home" "not loaded"; fi
if has_text "My Impact"; then log_pass "Impact grid (2x2) visible"; else log_fail "Impact grid" "not found"; fi
if has_text "Nearby Rescues"; then log_pass "Nearby Rescues section"; else log_fail "Rescues" "not found"; fi
if has_text "Deals Near You"; then log_pass "Deals section"; else log_fail "Deals" "not found"; fi
if test_scroll; then log_pass "Home SCROLLS ✅"; else log_fail "Home scroll" "FAILED"; fi

# ============================================================
log_section "FEATURE 6: Marketplace"
# ============================================================
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='market');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Marketplace"; then log_pass "Marketplace loads"; else log_fail "Marketplace" "not loaded"; fi
if has_text "Flash Deals"; then log_pass "Flash deal banner visible"; else log_fail "Flash banner" "not found"; fi
if test_scroll; then log_pass "Marketplace SCROLLS ✅"; else log_fail "Marketplace scroll" "FAILED"; fi

# ============================================================
log_section "FEATURE 7: Product Detail"
# ============================================================
agent-browser eval "(function(){const c=Array.from(document.querySelectorAll('*')).find(x=>x.textContent&&x.textContent.includes('OFF')&&x.textContent.includes('Amul')&&x.textContent.length<100);if(c){c.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Add to Cart" || has_text "AI Freshness" || has_text "About"; then log_pass "Product detail sheet opens"; else log_fail "Product detail" "not opened"; fi

# ============================================================
log_section "FEATURE 8: Impact Dashboard"
# ============================================================
agent-browser press Escape > /dev/null 2>&1; sleep 0.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='profile');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Your Impact" || has_text "Achievements" || has_text "Meals"; then log_pass "Impact dashboard loads"; else log_fail "Impact" "not loaded"; fi

# ============================================================
log_section "FEATURE 9: AI Assistant"
# ============================================================
agent-browser eval "(function(){const fab=document.querySelector('[class*=\"zw-ai-border\"]')?.closest('button');if(fab){fab.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Zira" || has_text "Ask"; then log_pass "AI Assistant opens"; else log_fail "AI" "not opened"; fi
agent-browser press Escape > /dev/null 2>&1; sleep 1

# ============================================================
log_section "FEATURE 10: Role Switching (NGO)"
# ============================================================
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Switch Role'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('NGO'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 2
if has_text "Rescue Feed" || has_text "Donations" || has_text "Donor"; then log_pass "NGO role loads"; else log_fail "NGO" "not loaded"; fi

# ============================================================
log_section "SUMMARY"
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TOTAL: $TOTAL"
echo "  ✅ PASSED: $PASS"
echo "  ❌ FAILED: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $FAIL -eq 0 ]; then echo "🎉 ALL TESTS PASSED!"; else echo "⚠️ $FAIL tests failed."; fi
