# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-global-top > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1, b, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedObj$1 = $(3);
const tmpInitAssignLhsComputedRhs$1 = $(4);
tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1, b, 3, 4);
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
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedObj$1 = $(c);
const tmpInitAssignLhsComputedRhs$1 = $(d);
tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, b, c, d);
`````


## Todos triggered


None


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
