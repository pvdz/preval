# Preval test case

# switch_func_hoisting2.md

> Normalize > Hoisting > Func > Switch func hoisting2
>
> Func decl inside a switch block

## Input

`````js filename=intro
switch ($(2)) {
  case $(1):
    f();
    break;
  case $(2):
    f();
    function f() { $('pass'); }
    f();
}
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(2);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`pass`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`pass`);
    $(`pass`);
  } else {
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(2);
if (tmpSwitchDisc === $(1)) {
  $(`pass`);
} else {
  if (tmpSwitchDisc === $(2)) {
    $(`pass`);
    $(`pass`);
  }
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    $(`pass`);
  };
  const tmpSwitchDisc = $(2);
  if (tmpSwitchDisc === $(1)) {
    f();
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
    f();
    f();
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    $(`pass`);
    return undefined;
  };
  const tmpSwitchDisc = $(2);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    f();
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(2);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      f();
      f();
    } else {
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( "pass" );
}
else {
  const d = $( 2 );
  const e = a === d;
  if (e) {
    $( "pass" );
    $( "pass" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 'pass'
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
