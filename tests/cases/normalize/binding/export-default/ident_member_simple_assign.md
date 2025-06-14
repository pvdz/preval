# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Export-default > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b.x = $(c).y = $(d);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
export { tmpInitAssignLhsComputedRhs$1 as a };
const b /*:object*/ /*truthy*/ = { x: tmpInitAssignLhsComputedRhs$1 };
$(tmpInitAssignLhsComputedRhs$1, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $(3);
const tmpInitAssignLhsComputedRhs$1 = $(4);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
export { tmpInitAssignLhsComputedRhs$1 as a };
$(tmpInitAssignLhsComputedRhs$1, { x: tmpInitAssignLhsComputedRhs$1 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
export { b as a };
const c = { x: b };
$( b, c, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedRhs$1 = $(d);
tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
b.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
