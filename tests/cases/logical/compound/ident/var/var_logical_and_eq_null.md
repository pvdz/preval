# Preval test case

# var_logical_and_eq_null.md

> Logical > Compound > Ident > Var > Var logical and eq null
>
>

## Input

`````js filename=intro
let a = $(null);
const c = a &&= $('b');
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(null);
if (a) {
  const tmpNestedComplexRhs /*:unknown*/ = $(`b`);
  $(tmpNestedComplexRhs);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(null);
if (a) {
  $($(`b`));
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
if (a) {
  const b = $( "b" );
  $( b );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - 2: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
