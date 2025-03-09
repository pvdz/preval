# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($(b)[$("x")] = $(c)[$("y")] = d);
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  $(100);
  $(a, b, c, 3);
} else {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  $(a, b, c, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  $(100);
  $(a, b, c, 3);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3;
  $(a, b, c, 3);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($(b)[$(`x`)] = $(c)[$(`y`)] = d);
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a, b, c, d);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = d;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = varInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = { y: 2 };
if (a) {
  $( 100 );
  $( b, c, d, 3 );
}
else {
  const e = $( c );
  const f = $( "x" );
  const g = $( d );
  const h = $( "y" );
  g[h] = 3;
  e[f] = 3;
  $( b, c, d, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
