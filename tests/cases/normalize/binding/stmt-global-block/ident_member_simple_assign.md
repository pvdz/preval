# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-global-block > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = b.x = $(c).y = $(d);
  $(a, b, c);
}
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const b /*:object*/ = { x: varInitAssignLhsComputedRhs$1 };
  $(varInitAssignLhsComputedRhs$1, b, 3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const varInitAssignLhsComputedObj = $(3);
  const varInitAssignLhsComputedRhs$1 = $(4);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, { x: varInitAssignLhsComputedRhs$1 }, 3);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = { x: 2 },
    c = 3,
    d = 4;
  let a = (b.x = $(c).y = $(d));
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
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
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  const d = { x: c };
  $( c, d, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
