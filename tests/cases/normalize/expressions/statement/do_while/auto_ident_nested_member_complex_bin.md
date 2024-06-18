# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Do while > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(b)[$("x")] = $(c)[$("y")] = d + e));
$(a, b, c, d, e);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($(b)[$(`x`)] = $(c)[$(`y`)] = d + e)) {
  } else {
    break;
  }
}
$(a, b, c, d, e);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = d + e;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c, d, e);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const c = $( a );
  const d = $( "x" );
  const e = $( b );
  const f = $( "y" );
  e[f] = 7;
  c[d] = 7;
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 100
 - 7: { x: '7' }
 - 8: 'x'
 - 9: { y: '7' }
 - 10: 'y'
 - 11: 100
 - 12: { x: '7' }
 - 13: 'x'
 - 14: { y: '7' }
 - 15: 'y'
 - 16: 100
 - 17: { x: '7' }
 - 18: 'x'
 - 19: { y: '7' }
 - 20: 'y'
 - 21: 100
 - 22: { x: '7' }
 - 23: 'x'
 - 24: { y: '7' }
 - 25: 'y'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
