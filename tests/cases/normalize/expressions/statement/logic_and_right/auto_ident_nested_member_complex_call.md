# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Logic and right > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(100) && ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = varInitAssignLhsComputedRhs;
  $(a, b, c, 3);
} else {
  $(a, b, c, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = $(3);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = varInitAssignLhsComputedRhs;
  $(a, b, c, 3);
} else {
  $(a, b, c, 3);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$(100) && ($(b)[$(`x`)] = $(c)[$(`y`)] = $(d));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = $(d);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d);
} else {
  $(a, b, c, d);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = { y: 2 };
const d = {
  a: 999,
  b: 1000,
};
if (a) {
  const e = $( b );
  const f = $( "x" );
  const g = $( c );
  const h = $( "y" );
  const i = $( 3 );
  g[h] = i;
  e[f] = i;
  $( d, b, c, 3 );
}
else {
  $( d, b, c, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
