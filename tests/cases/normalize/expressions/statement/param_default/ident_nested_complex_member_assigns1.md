# Preval test case

# ident_nested_complex_member_assigns1.md

> Normalize > Expressions > Statement > Param default > Ident nested complex member assigns1
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };
let c = 3;
function f() {
  $(b).x = $(b).x =  c
}
f();
$(100);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpAssignMemLhsObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
varInitAssignLhsComputedObj.x = 3;
tmpAssignMemLhsObj.x = 3;
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpAssignMemLhsObj = $(b);
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 3;
tmpAssignMemLhsObj.x = 3;
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( a );
c.x = 3;
b.x = 3;
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
