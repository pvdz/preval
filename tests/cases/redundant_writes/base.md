# Preval test case

# base.md

> Redundant writes > Base

## Input

`````js filename=intro
let n = 1;
if ($(true)) {
  n = 2;
} else {
  n = 3;
}
$(n);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(2);
} else {
  $(3);
}
`````

## Pre Normal


`````js filename=intro
let n = 1;
if ($(true)) {
  n = 2;
} else {
  n = 3;
}
$(n);
`````

## Normalized


`````js filename=intro
let n = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  n = 2;
  $(n);
} else {
  n = 3;
  $(n);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 2 );
}
else {
  $( 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
