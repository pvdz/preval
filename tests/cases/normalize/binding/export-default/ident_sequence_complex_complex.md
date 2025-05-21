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
const a /*:unknown*/ = tmpInitAssignLhsComputedRhs;
export { a };
$(a, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj = $(3);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
const a = tmpInitAssignLhsComputedRhs;
export { a };
$(a, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
const b = $( 3 );
a.x = b;
const c = b;
export { c as a };
$( c, 2, 3 );
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
