# Preval test case

# if_sequence.md

> Normalize > Sequence > If sequence
>
> Conditional sequence

## Input

`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(2);
if (tmpIfTest) {
  $(3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(2)) {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
if (($(1), $(2))) $(3);
`````

## Normalized


`````js filename=intro
$(1);
const tmpIfTest = $(2);
if (tmpIfTest) {
  $(3);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
if (a) {
  $( 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
