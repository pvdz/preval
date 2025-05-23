# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > For-a > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = b[$('x')] = c + d;false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj /*:object*/ = { x: 2 };
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedObj = { x: 2 };
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = { x: 2 };
b[a] = 7;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpInitAssignLhsComputedObj = b;
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedRhs = c + d;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
let a$1 = tmpInitAssignLhsComputedRhs;
`````


## Todos triggered


None


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
