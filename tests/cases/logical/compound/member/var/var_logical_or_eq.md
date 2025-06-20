# Preval test case

# var_logical_or_eq.md

> Logical > Compound > Member > Var > Var logical or eq
>
>

## Input

`````js filename=intro
let a = $({x: 1})
const c = a.x ||= $('b');
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: 1 };
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
const a = $({ x: 1 });
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
const a = { x: 1 };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { x: 1 };
let a = $(tmpCalleeParam);
let tmpInitAssignLhsComputedRhs = a.x;
if (tmpInitAssignLhsComputedRhs) {
} else {
  tmpInitAssignLhsComputedRhs = $(`b`);
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
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
