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
const a /*:object*/ = { x: 1 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(a);
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
const c /*:object*/ = { x: 3 };
const tmpCompObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = tmpCompObj.x;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({ x: 1 });
const varInitAssignLhsComputedObj$1 = $({ x: 2 });
const varInitAssignLhsComputedRhs$1 = $({ x: 3 }).x;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1);
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
