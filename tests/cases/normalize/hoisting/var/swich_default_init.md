# Preval test case

# swich_default_init.md

> Normalize > Hoisting > Var > Swich default init
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
switch ($(1)) {
  default:
    var x = 10;
    break;
  case 1:
    x = 20;
    break;
}
$(x);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = 1 === tmpSwitchValue;
if (tmpIfTest) {
  $(20);
} else {
  $(10);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if (1 === tmpSwitchValue) {
  $(20);
} else {
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 === a;
if (b) {
  $( 20 );
}
else {
  $( 10 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
