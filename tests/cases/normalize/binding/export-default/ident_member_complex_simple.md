# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > Export-default > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = $(b).x = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
tmpInitAssignLhsComputedObj.x = 3;
const a /*:number*/ /*truthy*/ = 3;
export { a };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const tmpInitAssignLhsComputedObj = $(b);
tmpInitAssignLhsComputedObj.x = 3;
const a = 3;
export { a };
$(3, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 3;
const c = 3;
export { c as a };
$( 3, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedRhs = c;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
export { a };
$(a, b, c);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
