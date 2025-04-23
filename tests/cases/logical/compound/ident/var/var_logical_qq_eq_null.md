# Preval test case

# var_logical_qq_eq_null.md

> Logical > Compound > Ident > Var > Var logical qq eq null
>
>

## Input

`````js filename=intro
let a = $(null);
const c = a ??= $('b');
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(null);
const tmpIfTest /*:boolean*/ = a == null;
if (tmpIfTest) {
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
if (a == null) {
  $($(`b`));
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = a == null;
if (b) {
  const c = $( "b" );
  $( c );
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
 - 2: 'b'
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
