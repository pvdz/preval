# Preval test case

# spying.md

> Normalize > Switch > Spying
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
    $('false');
    break;
  case $spy(1):
    $('true');
    break;
  case $spy(2):
    $('false');
    break;
}
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $spy(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`false`);
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $spy(1);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`true`);
  } else {
    const tmpBinBothRhs$3 /*:unknown*/ = $spy(2);
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs$3;
    if (tmpIfTest$3) {
      $(`false`);
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(1);
if (tmpSwitchDisc === $spy(0)) {
  $(`false`);
} else {
  if (tmpSwitchDisc === $spy(1)) {
    $(`true`);
  } else {
    if (tmpSwitchDisc === $spy(2)) {
      $(`false`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $spy( 0 );
const c = a === b;
if (c) {
  $( "false" );
}
else {
  const d = $spy( 1 );
  const e = a === d;
  if (e) {
    $( "true" );
  }
  else {
    const f = $spy( 2 );
    const g = a === f;
    if (g) {
      $( "false" );
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: 'Creating spy', 3, 1, [2, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
