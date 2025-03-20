# Preval test case

# eq_else_eq_false_bad.md

> Conditional typing > Eq else eq false bad
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
let a = $(67637)
let x = a === 67636;
if (x) {
} else {
  if ($) a = 67636
  x = a === 67636;
}
$(x)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(67637);
const x /*:boolean*/ = a === 67636;
if (x) {
  $(true);
} else {
  const tmpBool /*:boolean*/ = Boolean($);
  $(tmpBool);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(67637) === 67636) {
  $(true);
} else {
  $(Boolean($));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 67637 );
const b = a === 67636;
if (b) {
  $( true );
}
else {
  const c = Boolean( $ );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 67637
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
