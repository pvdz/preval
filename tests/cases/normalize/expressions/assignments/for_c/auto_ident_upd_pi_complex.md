# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = ++$($(b)).x);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = ++$($(b)).x;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    a = tmpNestedPropCompoundComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs /*:primitive*/ = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:unknown*/ = $(b);
      const tmpNestedAssignObj$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const tmpBinLhs$1 /*:unknown*/ = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 /*:primitive*/ = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = { x: 1 };
if (b) {
  const d = $( c );
  const e = $( d );
  const f = e.x;
  const g = f + 1;
  e.x = g;
  a = g;
  while ($LOOP_UNROLL_10) {
    const h = $( 1 );
    if (h) {
      const i = $( c );
      const j = $( i );
      const k = j.x;
      const l = k + 1;
      j.x = l;
      a = l;
    }
    else {
      break;
    }
  }
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 1
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 1
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 1
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 1
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 1
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 1
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 1
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
