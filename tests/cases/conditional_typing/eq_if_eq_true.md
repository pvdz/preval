# Preval test case

# eq_if_eq_true.md

> Conditional typing > Eq if eq true
>
> Assignment that cannot be observed should be dropped

First step: assign `false` instead of the repeat expression
Second step: eliminate the assignment since we know `x` is already `false` at that point

## Input

`````js filename=intro
const a = $(67636)
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x)
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(67636);
const x /*:boolean*/ = a === 67636;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(67636) === 67636);
`````

## Pre Normal


`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 67636 );
const b = a === 67636;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 67636
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
