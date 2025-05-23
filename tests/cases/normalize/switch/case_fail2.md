# Preval test case

# case_fail2.md

> Normalize > Switch > Case fail2
>
> Do cases spy

## Input

`````js filename=intro
switch ($(0)) {
  case $spy(0):
  case $spy(1):
    $('found');
}
$();
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(0);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 2;
const tmpBinLhs /*:unknown*/ = $spy(0);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $spy(1);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`found`);
  $();
} else {
  $();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(0);
let tmpSwitchCaseToStart = 2;
if ($spy(0) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($spy(1) === tmpSwitchValue) {
    tmpSwitchCaseToStart = 1;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`found`);
  $();
} else {
  $();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = 2;
const c = $spy( 0 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = $spy( 1 );
  const f = e === a;
  if (f) {
    b = 1;
  }
}
const g = b <= 1;
if (g) {
  $( "found" );
  $();
}
else {
  $();
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = $(0);
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $spy(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $spy(1);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`found`);
  $();
} else {
  $();
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
