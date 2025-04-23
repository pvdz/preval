# Preval test case

# var_logical_or_eq_null_const.md

> Logical > Compound > Member > Var > Var logical or eq null const
>
>

## Input

`````js filename=intro
const a = $({x: null})
const c = a.x ||= $('b');
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: null };
const a /*:unknown*/ = $(tmpCalleeParam);
let tmpInitAssignLhsComputedRhs /*:unknown*/ = a.x;
if (tmpInitAssignLhsComputedRhs) {
} else {
  tmpInitAssignLhsComputedRhs = $(`b`);
}
a.x = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $({ x: null });
let tmpInitAssignLhsComputedRhs = a.x;
if (!tmpInitAssignLhsComputedRhs) {
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

}
else {
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
 - 1: { x: 'null' }
 - 2: 'b'
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
