# Preval test case

# nested_simple_member_all.md

> Normalize > Expressions > Nested simple member all
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = {x:1}, b = {x:2}, c = {x:3};
$($(a).x = $(b).x = $(c).x);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { x: 1 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(a);
const b /*:object*/ /*truthy*/ = { x: 2 };
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
const c /*:object*/ /*truthy*/ = { x: 3 };
const tmpCompObj /*:unknown*/ = $(c);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj.x;
tmpInitAssignLhsComputedObj$1.x = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $({ x: 1 });
const tmpInitAssignLhsComputedObj$1 = $({ x: 2 });
const tmpInitAssignLhsComputedRhs$1 = $({ x: 3 }).x;
tmpInitAssignLhsComputedObj$1.x = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = { x: 2 };
const d = $( c );
const e = { x: 3 };
const f = $( e );
const g = f.x;
d.x = g;
b.x = g;
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
const tmpInitAssignLhsComputedObj = $(a);
const tmpInitAssignLhsComputedObj$1 = $(b);
const tmpCompObj = $(c);
const tmpInitAssignLhsComputedRhs$1 = tmpCompObj.x;
tmpInitAssignLhsComputedObj$1.x = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
let tmpCalleeParam = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '2' }
 - 3: { x: '3' }
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
