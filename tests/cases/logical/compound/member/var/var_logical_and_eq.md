# Preval test case

# var_logical_and_eq.md

> Logical > Compound > Member > Var > Var logical and eq
>
>

## Input

`````js filename=intro
let a = $({x: 1})
const c = a.x &&= $('b');
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: 1 };
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
const a = $({ x: 1 });
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
const a = { x: 1 };
const b = $( a );
let c = b.x;
if (c) {
  c = $( "b" );
}
b.x = c;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'b'
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
