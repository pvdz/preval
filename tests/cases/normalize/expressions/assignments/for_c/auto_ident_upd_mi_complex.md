# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = --$($(b)).x);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = --$($(b)).x;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = tmpNestedAssignObj.x;
    const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
    tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
    a = tmpNestedPropCompoundComplexRhs;
    tmpIfTest = $(1);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 - 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      tmpClusterSSA_tmpIfTest = $(1);
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
  b: 1000,
};
const c = $( 1 );
if (c) {
  const d = $( a );
  const e = $( d );
  const f = e.x;
  const g = f - 1;
  e.x = g;
  let h = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (h) {
      const i = $( a );
      const j = $( i );
      const k = j.x;
      const l = k - 1;
      j.x = l;
      h = $( 1 );
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
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '0' }
 - 6: { x: '0' }
 - 7: 1
 - 8: { x: '-1' }
 - 9: { x: '-1' }
 - 10: 1
 - 11: { x: '-2' }
 - 12: { x: '-2' }
 - 13: 1
 - 14: { x: '-3' }
 - 15: { x: '-3' }
 - 16: 1
 - 17: { x: '-4' }
 - 18: { x: '-4' }
 - 19: 1
 - 20: { x: '-5' }
 - 21: { x: '-5' }
 - 22: 1
 - 23: { x: '-6' }
 - 24: { x: '-6' }
 - 25: 1
 - 26: { x: '-7' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
