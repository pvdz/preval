# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($)?.($(1))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
let tmpIfTest /*:boolean*/ = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
  tmpIfTest = a === tmpSwitchValue;
}
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`fail1`);
  $(`fail2`);
  $(a);
} else {
  $(`fail2`);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
let tmpIfTest = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  tmpIfTest = a === tmpSwitchValue;
}
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a);
} else {
  $(`fail2`);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
let c = undefined;
const d = $( $ );
const e = d == null;
let f = false;
if (e) {
  f = undefined === a;
}
else {
  const g = $( 1 );
  c = $dotCall( d, $, undefined, g );
  f = c === a;
}
if (f) {
  b = 0;
}
else {
  const h = 2 === a;
  if (h) {
    b = 2;
  }
}
const i = b <= 1;
if (i) {
  $( "fail1" );
  $( "fail2" );
  $( c );
}
else {
  $( "fail2" );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
