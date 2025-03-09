# Preval test case

# neq_if_neq_false.md

> Conditional typing > Neq if neq false
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
const a = $(67637)
let x = a !== 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x)
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(67637);
const x /*:boolean*/ = a !== 67636;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(67637) !== 67636);
`````

## Pre Normal


`````js filename=intro
const a = $(67637);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67637);
let x = a !== 67636;
if (x) {
  x = a !== 67636;
  $(x);
} else {
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 67637 );
const b = a !== 67636;
$( b );
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
