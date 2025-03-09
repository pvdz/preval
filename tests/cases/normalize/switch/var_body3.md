# Preval test case

# var_body3.md

> Normalize > Switch > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    var x;
    break;
  case $(2):
    $(11);
}
$(x);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(11);
    $(undefined);
  } else {
    $(undefined);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(1);
if (tmpSwitchDisc === $(1)) {
  $(undefined);
} else {
  if (tmpSwitchDisc === $(2)) {
    $(11);
    $(undefined);
  } else {
    $(undefined);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    undefined;
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
    $(11);
  } else {
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(2);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(11);
    } else {
    }
  }
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( undefined );
}
else {
  const d = $( 2 );
  const e = a === d;
  if (e) {
    $( 11 );
    $( undefined );
  }
  else {
    $( undefined );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
