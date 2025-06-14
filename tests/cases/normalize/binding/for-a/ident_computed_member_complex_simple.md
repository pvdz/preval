# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > For-a > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = $(b)[$('x')] = c;false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $({ x: 2 });
const tmpInitAssignLhsComputedProp = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 3;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( "x" );
b[c] = 3;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedRhs = c;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
let a$1 = tmpInitAssignLhsComputedRhs;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - 2: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
