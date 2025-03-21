# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-func-block > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 2 };
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
  const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
  varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, b, 3, 4);
  $(undefined);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const b = { x: 2 };
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedObj$1 = $(3);
  const varInitAssignLhsComputedRhs$1 = $(4);
  varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, b, 3, 4);
  $(undefined);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = { x: 2 },
      c = 3,
      d = 4;
    let a = ($(b).x = $(c).y = $(d));
    $(a, b, c, d);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    let a = varInitAssignLhsComputedRhs;
    $(varInitAssignLhsComputedRhs, b, c, d);
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = { x: 2 };
  const c = $( b );
  const d = $( 3 );
  const e = $( 4 );
  d.y = e;
  c.x = e;
  $( e, b, 3, 4 );
  $( undefined );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 3
 - 4: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
