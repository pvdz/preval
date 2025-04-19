# Preval test case

# ident_computed_member_complex_bin.md

> Normalize > Binding > For-a > Ident computed member complex bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = $(b)[$('x')] = c + d;false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $({ x: 2 });
const tmpInitAssignLhsComputedProp = $(`x`);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( "x" );
b[c] = 7;
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
