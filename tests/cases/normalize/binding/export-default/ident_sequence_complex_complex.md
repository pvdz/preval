# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > Export-default > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c)).x = $(c);
$(a, b, c);
`````


## Settled


`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
export { tmpInitAssignLhsComputedRhs as a };
$(tmpInitAssignLhsComputedRhs, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj = $(3);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
export { tmpInitAssignLhsComputedRhs as a };
$(tmpInitAssignLhsComputedRhs, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
const b = $( 3 );
a.x = b;
export { b as a };
$( b, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 2;
let c = 3;
$(b);
const tmpInitAssignLhsComputedObj = $(c);
const tmpInitAssignLhsComputedRhs = $(c);
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
