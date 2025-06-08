# Preval test case

# var_logical_and_eq_null.md

> Logical > Compound > Member > Var > Var logical and eq null
>
>

## Input

`````js filename=intro
let a = $({x: null})
const c = a.x &&= $('b');
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: null };
const a /*:unknown*/ = $(tmpCalleeParam);
let tmpInitAssignLhsComputedRhs /*:unknown*/ = a.x;
if (tmpInitAssignLhsComputedRhs) {
  tmpInitAssignLhsComputedRhs = $(`b`);
} else {
}
a.x = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $({ x: null });
let tmpInitAssignLhsComputedRhs = a.x;
if (tmpInitAssignLhsComputedRhs) {
  tmpInitAssignLhsComputedRhs = $(`b`);
}
a.x = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: null };
const b = $( a );
let c = b.x;
if (c) {
  c = $( "b" );
}
b.x = c;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { x: null };
let a = $(tmpCalleeParam);
let tmpInitAssignLhsComputedRhs = a.x;
if (tmpInitAssignLhsComputedRhs) {
  tmpInitAssignLhsComputedRhs = $(`b`);
} else {
}
a.x = tmpInitAssignLhsComputedRhs;
const c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: 'null' }
 - 2: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
