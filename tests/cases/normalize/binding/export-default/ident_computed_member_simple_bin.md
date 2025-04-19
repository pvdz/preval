# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Export-default > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = b[$('x')] = c + d;
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const b /*:object*/ = { x: 2 };
b[tmpInitAssignLhsComputedProp] = 7;
const a /*:number*/ = 7;
export { a };
$(7, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`x`);
const b = { x: 2 };
b[tmpInitAssignLhsComputedProp] = 7;
const a = 7;
export { a };
$(7, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 7;
const c = 7;
export { c as a };
$( 7, b, 3 );
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
