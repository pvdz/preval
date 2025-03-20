# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > For-a > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = b[$('x')] = c;false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const b /*:object*/ = { x: 2 };
b[varInitAssignLhsComputedProp] = 3;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedProp = $(`x`);
const b = { x: 2 };
b[varInitAssignLhsComputedProp] = 3;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 3;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
