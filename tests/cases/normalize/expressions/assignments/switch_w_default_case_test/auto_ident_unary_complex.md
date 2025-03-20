# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = typeof $(x)):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 1;
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
const tmpIfTest /*:boolean*/ = a === tmpSwitchValue;
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
  $(a, 1);
} else {
  $(`fail2`);
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
if (a === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`fail1`);
  $(`fail2`);
  $(a, 1);
} else {
  $(`fail2`);
  $(a, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( 1 );
const d = typeof c;
const e = d === a;
if (e) {
  b = 0;
}
else {
  const f = 2 === a;
  if (f) {
    b = 2;
  }
}
const g = b <= 1;
if (g) {
  $( "fail1" );
  $( "fail2" );
  $( d, 1 );
}
else {
  $( "fail2" );
  $( d, 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
