# Preval test case

# swich_case_init.md

> Normalize > Hoisting > Func > Swich case init
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(`f`);
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(1);
if (!(tmpSwitchDisc === 0)) {
  if (tmpSwitchDisc === 1) {
    $(`f`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 0;
if (b) {

}
else {
  const c = a === 1;
  if (c) {
    $( "f" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    const tmpReturnArg = $(`f`);
    return tmpReturnArg;
  };
  const tmpSwitchDisc = $(1);
  const tmpIfTest = tmpSwitchDisc === 0;
  if (tmpIfTest) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
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
