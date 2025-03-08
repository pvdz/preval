# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > Stmt-global-block > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = b[$('x')] = c;
  $(a, b, c);
}
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const b /*:object*/ = { x: 2 };
  b[varInitAssignLhsComputedProp] = 3;
  $(3, b, 3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const varInitAssignLhsComputedProp = $(`x`);
  const b = { x: 2 };
  b[varInitAssignLhsComputedProp] = 3;
  $(3, b, 3);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = { x: 2 },
    c = 3;
  let a = (b[$(`x`)] = c);
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs, b, c);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( "x" );
  const c = { x: 2 };
  c[b] = 3;
  $( 3, c, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
