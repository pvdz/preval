# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > For let > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (let xyz = ($(b)[$("x")] = $(c)[$("y")] = $(d)); ; $(1)) $(xyz);
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(varInitAssignLhsComputedRhs$1);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({ x: 1 });
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $({ y: 2 });
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
while (true) {
  $(varInitAssignLhsComputedRhs$1);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
{
  let xyz = ($(b)[$(`x`)] = $(c)[$(`y`)] = $(d));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let xyz = varInitAssignLhsComputedRhs;
while (true) {
  $(xyz);
  $(1);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
b[c] = g;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( g );
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
 - 5: 3
 - 6: 3
 - 7: 1
 - 8: 3
 - 9: 1
 - 10: 3
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 3
 - 21: 1
 - 22: 3
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
