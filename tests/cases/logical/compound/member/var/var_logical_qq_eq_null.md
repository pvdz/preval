# Preval test case

# var_logical_qq_eq_null.md

> Logical > Compound > Member > Var > Var logical qq eq null
>
>

## Input

`````js filename=intro
let a = $({x: null})
const c = a.x ??= $('b');
$(c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: null };
const a /*:unknown*/ = $(tmpCalleeParam);
let tmpInitAssignLhsComputedRhs /*:unknown*/ = a.x;
const tmpIfTest /*:boolean*/ = tmpInitAssignLhsComputedRhs == null;
if (tmpIfTest) {
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
if (tmpInitAssignLhsComputedRhs == null) {
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
const d = c == null;
if (d) {
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
