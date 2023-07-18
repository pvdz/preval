# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (++$($(b)).x);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = ++$($(b)).x;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    tmpDoWhileFlag = tmpNestedPropCompoundComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
  const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
  const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
  tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedPropCompoundComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const tmpNestedAssignObj$2 = $(tmpCalleeParam$2);
      const tmpBinLhs$2 = tmpNestedAssignObj$2.x;
      const tmpNestedPropCompoundComplexRhs$2 = tmpBinLhs$2 + 1;
      tmpNestedAssignObj$2.x = tmpNestedPropCompoundComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedPropCompoundComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( c );
const e = d.x;
const f = e + 1;
d.x = f;
if (f) {
  $( 100 );
  const g = $( a );
  const h = $( g );
  const i = h.x;
  const j = i + 1;
  h.x = j;
  let k = j;
  while ($LOOP_UNROLL_9) {
    if (k) {
      $( 100 );
      const l = $( a );
      const m = $( l );
      const n = m.x;
      const o = n + 1;
      m.x = o;
      k = o;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 100
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 100
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 100
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 100
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 100
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 100
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 100
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
