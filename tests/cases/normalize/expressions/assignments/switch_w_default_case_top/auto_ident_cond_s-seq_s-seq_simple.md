# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch w default case top > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (10, 20, 30) ? (40, 50, 60) : $($(100));
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = { a: 999, b: 1000 };
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
const tmpBinLhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  a = 60;
} else {
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
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 0) {
  a = 60;
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
let c = 1;
const d = $( 1 );
const e = d === b;
if (e) {
  c = 0;
}
else {
  const f = 2 === b;
  if (f) {
    c = 2;
  }
}
const g = c <= 0;
if (g) {
  a = 60;
}
const h = c <= 1;
if (h) {
  $( "fail1" );
  $( "fail2" );
  $( a );
}
else {
  $( "fail2" );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
