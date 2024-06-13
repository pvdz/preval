# Preval test case

# auto_ident_upd_pi_complex2.md

> Normalize > Expressions > Assignments > For c > Auto ident upd pi complex2
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { x: 1 };
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
const b = { x: 1 };
if (tmpIfTest) {
  const tmpCalleeParam = $(b);
  const tmpNestedAssignObj = $(tmpCalleeParam);
  const tmpBinLhs = tmpNestedAssignObj.x;
  const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
  tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
  a = tmpNestedPropCompoundComplexRhs;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCalleeParam$1 = $(b);
      const tmpNestedAssignObj$1 = $(tmpCalleeParam$1);
      const tmpBinLhs$1 = tmpNestedAssignObj$1.x;
      const tmpNestedPropCompoundComplexRhs$1 = tmpBinLhs$1 + 1;
      tmpNestedAssignObj$1.x = tmpNestedPropCompoundComplexRhs$1;
      a = tmpNestedPropCompoundComplexRhs$1;
      tmpIfTest = $(1);
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
let b = $( 1 );
let c = true;
const d = { x: 1 };
if (b) {
  const e = $( d );
  const f = $( e );
  const g = f.x;
  const h = g + 1;
  f.x = h;
  a = h;
  b = $( 1 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      const i = $( d );
      const j = $( i );
      const k = j.x;
      const l = k + 1;
      j.x = l;
      a = l;
      b = $( 1 );
    }
    else {
      break;
    }
  }
}
$( a, d );
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
