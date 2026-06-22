#!/bin/bash
# Zero-Waste Comprehensive E2E Test Suite v3
# Fixed scroll test — checks if content is scrollable (scrollHeight > clientHeight)

set -e
PASS=0
FAIL=0
TOTAL=0

log_pass() { echo "✅ PASS: $1"; PASS=$((PASS+1)); TOTAL=$((TOTAL+1)); }
log_fail() { echo "❌ FAIL: $1 — $2"; FAIL=$((FAIL+1)); TOTAL=$((TOTAL+1)); }
log_section() { echo ""; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; echo "▶ $1"; echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"; }

agent-browser set viewport 414 896 > /dev/null 2>&1
agent-browser open http://localhost:3000 > /dev/null 2>&1
sleep 3

click_text() {
  agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('$1'));if(b){b.click();return 'ok';}return 'nf';})()" 2>/dev/null | tail -1
}

has_text() {
  result=$(agent-browser eval "(function(){return document.body.textContent.includes('$1');})()" 2>/dev/null | tail -1)
  if [ "$result" = "true" ]; then return 0; else return 1; fi
}

# Fixed scroll test: checks if main element has scrollable content
test_scroll() {
  result=$(agent-browser eval "(function(){
    const m = document.querySelector('main');
    if(!m) return 'no-main';
    const canScroll = m.scrollHeight > m.clientHeight + 50;
    const overflow = getComputedStyle(m).overflowY;
    return 'canScroll:' + canScroll + ' overflow:' + overflow + ' scrollH:' + m.scrollHeight + ' clientH:' + m.clientHeight;
  })()" 2>/dev/null | tail -1)
  if echo "$result" | grep -q "canScroll:true"; then return 0; else return 1; fi
}

# ============================================================
log_section "FEATURE 1: Onboarding (Story-based 3 slides)"
# ============================================================

if has_text "The Problem"; then log_pass "Slide 1 renders (Problem)"; else log_fail "Onboarding slide 1" "not found"; fi
click_text "Continue" > /dev/null; sleep 1
if has_text "The Solution"; then log_pass "Slide 2 renders (Solution)"; else log_fail "Slide 2" "not found"; fi
click_text "Continue" > /dev/null; sleep 1
if has_text "Join the movement"; then log_pass "Slide 3 renders (Action)"; else log_fail "Slide 3" "not found"; fi
click_text "Get Started" > /dev/null; sleep 1.5

# ============================================================
log_section "FEATURE 2: Role Selection"
# ============================================================

if has_text "Normal User"; then log_pass "Normal User role visible"; else log_fail "Role" "not found"; fi
if has_text "Shop Owner"; then log_pass "Shop Owner role visible"; else log_fail "Role" "not found"; fi
if has_text "NGO"; then log_pass "NGO role visible"; else log_fail "Role" "not found"; fi
if has_text "Volunteer"; then log_pass "Volunteer role visible"; else log_fail "Role" "not found"; fi
click_text "Normal User" > /dev/null; sleep 2

# ============================================================
log_section "FEATURE 3: Home Screen"
# ============================================================

if has_text "Good evening" || has_text "Ramesh"; then log_pass "Home greeting visible"; else log_fail "Home" "not loaded"; fi
if has_text "Community Impact"; then log_pass "Community Impact section"; else log_fail "Home section" "not found"; fi
if has_text "Nearby Requests"; then log_pass "Nearby Requests section"; else log_fail "Home section" "not found"; fi
if has_text "AI Matched"; then log_pass "AI Matched section"; else log_fail "Home section" "not found"; fi
if has_text "Deals near you"; then log_pass "Deals section"; else log_fail "Home section" "not found"; fi
if has_text "Recent Activity"; then log_pass "Recent Activity section"; else log_fail "Home section" "not found"; fi

if test_scroll; then log_pass "Home screen SCROLLS ✅"; else log_fail "Home scroll" "content not scrollable"; fi

# ============================================================
log_section "FEATURE 4: Marketplace"
# ============================================================

agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='marketplace');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
if has_text "Marketplace"; then log_pass "Marketplace loads"; else log_fail "Marketplace" "not loaded"; fi

agent-browser eval "(function(){const i=document.querySelector('input[placeholder*=\"Search\"]');if(i){i.value='milk';i.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1
if has_text "Amul Toned Milk"; then log_pass "Search filters correctly"; else log_fail "Search" "milk not found"; fi
agent-browser eval "(function(){const i=document.querySelector('input[placeholder*=\"Search\"]');if(i){i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1

if test_scroll; then log_pass "Marketplace SCROLLS ✅"; else log_fail "Marketplace scroll" "content not scrollable"; fi

# ============================================================
log_section "FEATURE 5: Product Detail + Cart"
# ============================================================

agent-browser eval "(function(){const c=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('OFF')&&x.textContent.includes('Amul'));if(c){c.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1.5
if has_text "Add to cart"; then log_pass "Product detail sheet opens"; else log_fail "Product detail" "not opened"; fi
click_text "Add to cart" > /dev/null; sleep 1.5
if has_text "Your Cart"; then log_pass "Cart sheet opens after add"; else log_fail "Cart" "not opened"; fi
if has_text "Bill Details"; then log_pass "Cart shows bill details"; else log_fail "Cart bill" "not shown"; fi

# ============================================================
log_section "FEATURE 6: Checkout"
# ============================================================

click_text "Checkout" > /dev/null; sleep 1.5
if has_text "Delivery Address"; then log_pass "Checkout address section"; else log_fail "Checkout" "address missing"; fi
if has_text "Payment Method"; then log_pass "Checkout payment section"; else log_fail "Checkout" "payment missing"; fi
if has_text "Bill Details"; then log_pass "Checkout bill section"; else log_fail "Checkout" "bill missing"; fi
if test_scroll; then log_pass "Checkout SCROLLS ✅"; else log_fail "Checkout scroll" "content not scrollable"; fi

# ============================================================
log_section "FEATURE 7: Donate Food Flow"
# ============================================================

agent-browser press Escape > /dev/null 2>&1; sleep 0.5
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='donate');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1.5
if has_text "Donate Food"; then log_pass "Donate step 1 loads"; else log_fail "Donate" "not loaded"; fi

if has_text "Add photo"; then
  agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Add photo'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
  sleep 2.5
  if has_text "AI Recognition"; then log_pass "AI recognition works"; else log_fail "AI recognition" "not completed"; fi
  click_text "Continue" > /dev/null; sleep 1
  if has_text "Pickup location"; then log_pass "Donate step 2 loads"; else log_fail "Donate step 2" "not loaded"; fi
  agent-browser eval "(function(){const t=document.querySelector('textarea');if(t){t.value='8th Street, Anna Nagar';t.dispatchEvent(new Event('input',{bubbles:true}));return 'ok';}return 'nf';})()" > /dev/null 2>&1
  sleep 0.5
  click_text "Continue" > /dev/null; sleep 1
  if has_text "Review"; then log_pass "Donate step 3 loads"; else log_fail "Donate step 3" "not loaded"; fi
  click_text "Confirm" > /dev/null; sleep 2.5
else
  log_fail "Donate flow" "Add photo not found"
fi

# ============================================================
log_section "FEATURE 8: Impact Dashboard"
# ============================================================

agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='impact');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1.5
if has_text "Your Impact"; then log_pass "Impact dashboard loads"; else log_fail "Impact" "not loaded"; fi
if has_text "Badges"; then log_pass "Badges section"; else log_fail "Badges" "not found"; fi
if has_text "Recent Activity"; then log_pass "Activity feed"; else log_fail "Activity" "not found"; fi
if test_scroll; then log_pass "Impact SCROLLS ✅"; else log_fail "Impact scroll" "content not scrollable"; fi

# ============================================================
log_section "FEATURE 9: AI Assistant"
# ============================================================

agent-browser eval "(function(){const fab=document.querySelector('[class*=\"zw-aura\"]')?.closest('button');if(fab){fab.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1
sleep 1.5
if has_text "Zira AI"; then log_pass "AI Assistant opens"; else log_fail "AI Assistant" "not opened"; fi
click_text "cheapest milk" > /dev/null; sleep 2.5
if has_text "Amul Toned Milk"; then log_pass "AI responds correctly"; else log_fail "AI response" "no answer"; fi
agent-browser press Escape > /dev/null 2>&1; sleep 1

# ============================================================
log_section "FEATURE 10-12: Role Switching"
# ============================================================

# NGO
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='profile');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Switch Role'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
click_text "NGO" > /dev/null; sleep 2
if has_text "Rescue Feed"; then log_pass "NGO role loads"; else log_fail "NGO" "not loaded"; fi
if has_text "Accept"; then log_pass "NGO feed shows donations"; else log_fail "NGO feed" "no donations"; fi
if test_scroll; then log_pass "NGO feed SCROLLS ✅"; else log_fail "NGO scroll" "content not scrollable"; fi

# Volunteer
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='profile');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Switch Role'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
click_text "Volunteer" > /dev/null; sleep 2
if has_text "Volunteer Hub"; then log_pass "Volunteer role loads"; else log_fail "Volunteer" "not loaded"; fi

# Shop
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.getAttribute('aria-label')==='profile');if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1
agent-browser eval "(function(){const b=Array.from(document.querySelectorAll('button')).find(x=>x.textContent&&x.textContent.includes('Switch Role'));if(b){b.click();return 'ok';}return 'nf';})()" > /dev/null 2>&1; sleep 1.5
click_text "Shop Owner" > /dev/null; sleep 2
if has_text "FreshMart" || has_text "Overview"; then log_pass "Shop role loads"; else log_fail "Shop" "not loaded"; fi
if test_scroll; then log_pass "Shop dashboard SCROLLS ✅"; else log_fail "Shop scroll" "content not scrollable"; fi

# ============================================================
log_section "SUMMARY"
# ============================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TOTAL: $TOTAL"
echo "  ✅ PASSED: $PASS"
echo "  ❌ FAILED: $FAIL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAIL -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED!"
else
  echo "⚠️  $FAIL tests failed."
fi
