# Preval test case

# swich_default_init2.md

> Normalize > Hoisting > Func > Swich default init2
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
const x = $(1);
switch (x) {
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
const x /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = 1 === x;
if (tmpIfTest) {
  $(`f`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (1 === x) {
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
let f = function () {
  debugger;
  const tmpReturnArg = $(`f`);
  return tmpReturnArg;
};
let tmpSwitchValue = x;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      f();
      break tmpSwitchBreak;
    } else {
    }
  }
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
