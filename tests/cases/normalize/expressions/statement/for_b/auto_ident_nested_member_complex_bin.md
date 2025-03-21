# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > For b > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (; ($(b)[$("x")] = $(c)[$("y")] = d + e); $(1));
$(a, b, c, d, e);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
while (true) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
{
  while (($(b)[$(`x`)] = $(c)[$(`y`)] = d + e)) {
    $(1);
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
    $(1);
  } else {
    break;
  }
}
$(a, b, c, d, e);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = $( a );
  const d = $( "x" );
  const e = $( b );
  const f = $( "y" );
  e[f] = 7;
  c[d] = 7;
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 1
 - 6: { x: '7' }
 - 7: 'x'
 - 8: { y: '7' }
 - 9: 'y'
 - 10: 1
 - 11: { x: '7' }
 - 12: 'x'
 - 13: { y: '7' }
 - 14: 'y'
 - 15: 1
 - 16: { x: '7' }
 - 17: 'x'
 - 18: { y: '7' }
 - 19: 'y'
 - 20: 1
 - 21: { x: '7' }
 - 22: 'x'
 - 23: { y: '7' }
 - 24: 'y'
 - 25: 1
 - 26: { x: '7' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
