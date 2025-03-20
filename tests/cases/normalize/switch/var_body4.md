# Preval test case

# var_body4.md

> Normalize > Switch > Var body4
>
> Var as body of a do-while

## Input

`````js filename=intro
let x = undefined;
let tmpSwitchCaseToStart = $(0);
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    x = 10;
    break tmpSwitchBreak;
  } else {
  }
}
$(x);
`````


## Settled


`````js filename=intro
const tmpSwitchCaseToStart /*:unknown*/ = $(0);
const tmpIfTest$3 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  $(10);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0) <= 0) {
  $(10);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a <= 0;
if (b) {
  $( 10 );
}
else {
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
