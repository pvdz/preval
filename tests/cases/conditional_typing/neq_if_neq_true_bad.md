# Preval test case

# neq_if_neq_true_bad.md

> Conditional typing > Neq if neq true bad
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(67636);
const x /*:boolean*/ = a === 67636;
if (x) {
  $(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(67636) === 67636) {
  $(`Preval: Cannot write to const binding \`a\``);
  $(false);
} else {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 67636 );
const b = a === 67636;
if (b) {
  $( "Preval: Cannot write to const binding `a`" );
  $( false );
}
else {
  $( true );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 67636
 - 2: 'Preval: Cannot write to const binding `a`'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
