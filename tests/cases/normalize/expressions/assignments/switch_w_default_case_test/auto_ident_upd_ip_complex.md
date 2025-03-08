# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($(b)).x++):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
`````

## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpIfTest /*:boolean*/ = tmpUpdNum === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
$(`fail2`);
$(tmpUpdNum, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
if (tmpUpdNum === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
}
$(`fail2`);
$(tmpUpdNum, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ((a = $($(b)).x++) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCalleeParam = $(b);
let tmpUpdObj = $(tmpCalleeParam);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdNum;
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $(`fail2`);
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = { x: 1 };
const d = $( c );
const e = $( d );
const f = e.x;
const g = $coerce( f, "number" );
const h = g + 1;
e.x = h;
const i = g === a;
if (i) {
  b = 0;
}
else {
  const j = 2 === a;
  if (j) {
    b = 2;
  }
}
const k = b <= 1;
if (k) {
  $( "fail1" );
}
$( "fail2" );
$( g, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
