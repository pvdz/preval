# Preval test case

# ident_member_complex_bin.md

> Normalize > Binding > Stmt-global-top > Ident member complex bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = $(b).x = c + d;
$(a, b, c);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
tmpInitAssignLhsComputedObj.x = 7;
$(7, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 2 };
const tmpInitAssignLhsComputedObj = $(b);
tmpInitAssignLhsComputedObj.x = 7;
$(7, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 7;
$( 7, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpInitAssignLhsComputedObj = $(b);
const tmpInitAssignLhsComputedRhs = c + d;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
let a = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - 2: 7, { x: '7' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
