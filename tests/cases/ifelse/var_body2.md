# Preval test case

# var_body2.md

> Ifelse > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
if ($(true)) var x = 0;
$(x);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(0);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(0);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(true)) x = 0;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
} else {
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 0 );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
