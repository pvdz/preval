# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-func-top > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1, b, 3, 4);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1, b, 3, 4);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( 3 );
const d = $( 4 );
c.y = d;
b.x = d;
$( d, a, 3, 4 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
