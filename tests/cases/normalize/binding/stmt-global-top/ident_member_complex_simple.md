# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > Stmt-global-top > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
let a = $(b).x = c;
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
tmpInitAssignLhsComputedObj.x = 3;
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const tmpInitAssignLhsComputedObj = $(b);
tmpInitAssignLhsComputedObj.x = 3;
$(3, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 3;
$( 3, a, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
