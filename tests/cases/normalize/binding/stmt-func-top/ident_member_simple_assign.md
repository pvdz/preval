# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-func-top > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = b.x = $(c).y = $(d);
  $(a, b, c);
}
$(f());
`````

## Settled


`````js filename=intro
const varInitAssignLhsComputedObj /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const b /*:object*/ = { x: varInitAssignLhsComputedRhs$1 };
$(varInitAssignLhsComputedRhs$1, b, 3);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1, { x: varInitAssignLhsComputedRhs$1 }, 3);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 },
    c = 3,
    d = 4;
  let a = (b.x = $(c).y = $(d));
  $(a, b, c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
const c = { x: b };
$( b, c, 3 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
