# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-global-top > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = b.x = $(c).y = $(d);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
const b /*:object*/ = { x: tmpInitAssignLhsComputedRhs$1 };
$(tmpInitAssignLhsComputedRhs$1, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $(3);
const tmpInitAssignLhsComputedRhs$1 = $(4);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1, { x: tmpInitAssignLhsComputedRhs$1 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
const c = { x: b };
$( b, c, 3 );
`````


## Todos triggered


None


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
