# Preval test case

# var_body2.md

> Normalize > Switch > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    var x = 10;
    break;
  case $(2):
    $(11);
}
$(x);
`````

## Settled


`````js filename=intro
let x /*:primitive*/ = undefined;
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  x = 10;
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(11);
  } else {
  }
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
const tmpSwitchDisc = $(1);
if (tmpSwitchDisc === $(1)) {
  x = 10;
} else {
  if (tmpSwitchDisc === $(2)) {
    $(11);
  }
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    x = 10;
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
    x = 10;
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
let a = undefined;
const b = $( 1 );
const c = $( 1 );
const d = b === c;
if (d) {
  a = 10;
}
else {
  const e = $( 2 );
  const f = b === e;
  if (f) {
    $( 11 );
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
