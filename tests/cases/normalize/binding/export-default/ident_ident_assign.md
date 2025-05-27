# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Export-default > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
export let a = b = $(c).y = $(d);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpNestedAssignObj /*:unknown*/ = $(3);
const tmpNestedPropAssignRhs /*:unknown*/ = $(4);
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
export { tmpNestedPropAssignRhs as a };
$(tmpNestedPropAssignRhs, tmpNestedPropAssignRhs, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObj = $(3);
const tmpNestedPropAssignRhs = $(4);
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
export { tmpNestedPropAssignRhs as a };
$(tmpNestedPropAssignRhs, tmpNestedPropAssignRhs, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
export { b as a };
$( b, b, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
const tmpNestedAssignObj = $(c);
const tmpNestedAssignPropRhs = $(d);
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
b = tmpNestedPropAssignRhs;
let a = b;
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
