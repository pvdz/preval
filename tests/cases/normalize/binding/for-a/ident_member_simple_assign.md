# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > For-a > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = b.x = $(c).y = $(d);false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $(3);
tmpInitAssignLhsComputedObj.y = $(4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedRhs$1 = $(d);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
b.x = tmpInitAssignLhsComputedRhs;
let a$1 = tmpInitAssignLhsComputedRhs;
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
