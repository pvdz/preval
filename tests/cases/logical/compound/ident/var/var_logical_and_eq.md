# Preval test case

# var_logical_and_eq.md

> Logical > Compound > Ident > Var > Var logical and eq
>
>

## Input

`````js filename=intro
let a = $spy('a');
const c = a &&= $('b');
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $spy(`a`);
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
const a = $spy(`a`);
if (a) {
  $($(`b`));
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
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
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'b'
 - 3: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
