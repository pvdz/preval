# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (1, 2, $(b))?.x):
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
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp == null;
let tmpIfTest /*:boolean*/ = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  a = tmpChainElementObject;
  tmpIfTest = tmpChainElementObject === tmpSwitchValue;
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
const tmpChainRootProp = $({ x: 1 });
const tmpIfTest$1 = tmpChainRootProp == null;
let tmpIfTest = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  tmpIfTest = tmpChainElementObject === tmpSwitchValue;
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
const d = { x: 1 };
const e = $( d );
const f = e == null;
let g = false;
if (f) {
  g = undefined === a;
}
else {
  const h = e.x;
  c = h;
  g = h === a;
}
if (g) {
  b = 0;
}
else {
  const i = 2 === a;
  if (i) {
    b = 2;
  }
}
const j = b <= 1;
if (j) {
  $( "fail1" );
  $( "fail2" );
  $( c );
}
else {
  $( "fail2" );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
