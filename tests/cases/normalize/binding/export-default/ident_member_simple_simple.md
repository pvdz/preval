# Preval test case

# ident_member_simple_simple.md

> Normalize > Binding > Export-default > Ident member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = b.x = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = 3;
export { a };
const b /*:object*/ /*truthy*/ = { x: 3 };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 3;
export { a };
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 3;
export { a as a };
const b = { x: 3 };
$( 3, b, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
const tmpInitAssignLhsComputedRhs = c;
b.x = tmpInitAssignLhsComputedRhs;
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
