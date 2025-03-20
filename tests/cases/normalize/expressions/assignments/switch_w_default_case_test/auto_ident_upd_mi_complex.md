# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = --$($(b)).x):
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
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
const tmpIfTest /*:boolean*/ = tmpUpdInc === tmpSwitchValue;
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
  $(`fail2`);
  $(tmpUpdInc, b);
} else {
  $(`fail2`);
  $(tmpUpdInc, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdInc = $coerce(tmpUpdObj.x, `number`) - 1;
tmpUpdObj.x = tmpUpdInc;
if (tmpUpdInc === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(tmpUpdInc, b);
} else {
  $(`fail2`);
  $(tmpUpdInc, b);
}
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
const h = g - 1;
e.x = h;
const i = h === a;
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
  $( "fail2" );
  $( h, c );
}
else {
  $( "fail2" );
  $( h, c );
}
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
 - 6: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
