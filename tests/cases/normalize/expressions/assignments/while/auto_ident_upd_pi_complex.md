# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > While > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = ++$($(b)).x)) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ((a = ++$($(b)).x)) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs /*:primitive*/ = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:unknown*/ = $(b);
    const tmpNestedAssignObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const tmpBinLhs$1 /*:unknown*/ = tmpNestedAssignObj$1.x;
    const tmpNestedPropCompoundComplexRhs$1 /*:primitive*/ = tmpBinLhs$1 + 1;
    tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
    tmpClusterSSA_a = tmpNestedPropCompoundComplexRhs$1;
    if (tmpNestedPropCompoundComplexRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
let f = e;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( a );
    const h = $( g );
    const i = h.x;
    const j = i + 1;
    h.x = j;
    f = j;
    if (j) {

    }
    else {
      break;
    }
  }
}
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '2' }
 - 5: { x: '2' }
 - 6: 100
 - 7: { x: '3' }
 - 8: { x: '3' }
 - 9: 100
 - 10: { x: '4' }
 - 11: { x: '4' }
 - 12: 100
 - 13: { x: '5' }
 - 14: { x: '5' }
 - 15: 100
 - 16: { x: '6' }
 - 17: { x: '6' }
 - 18: 100
 - 19: { x: '7' }
 - 20: { x: '7' }
 - 21: 100
 - 22: { x: '8' }
 - 23: { x: '8' }
 - 24: 100
 - 25: { x: '9' }
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
