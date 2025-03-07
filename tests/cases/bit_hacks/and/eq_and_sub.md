# Preval test case

# eq_and_sub.md

> Bit hacks > And > Eq and sub
>
> The and is subsumed by the eq

## Input

`````js filename=intro
const a = $(33);
if (a === 32) {
  if (a & 32) {
    $('pass');
  }
}
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(33);
const tmpIfTest /*:boolean*/ = a === 32;
if (tmpIfTest) {
  $(`pass`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(33) === 32) {
  $(`pass`);
}
`````

## Pre Normal


`````js filename=intro
const a = $(33);
if (a === 32) {
  if (a & 32) {
    $(`pass`);
  }
}
`````

## Normalized


`````js filename=intro
const a = $(33);
const tmpIfTest = a === 32;
if (tmpIfTest) {
  const tmpIfTest$1 = a & 32;
  if (tmpIfTest$1) {
    $(`pass`);
  } else {
  }
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 33 );
const b = a === 32;
if (b) {
  $( "pass" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 33
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
