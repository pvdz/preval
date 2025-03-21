# Preval test case

# swich_default_init.md

> Normalize > Hoisting > Func > Swich default init
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
switch ($(1)) {
  default:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = 1 === tmpSwitchValue;
if (tmpIfTest) {
  $(`f`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
if (1 === tmpSwitchValue) {
  $(`f`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 === a;
if (b) {
  $( "f" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
