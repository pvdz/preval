# Preval test case

# ident_member_simple_simple.md

> Normalize > Binding > Stmt-global-top > Ident member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = b.x = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 3 };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( 3, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
const tmpInitAssignLhsComputedRhs = c;
b.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
