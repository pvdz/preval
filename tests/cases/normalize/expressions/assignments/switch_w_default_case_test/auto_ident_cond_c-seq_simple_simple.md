# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, $(30)) ? $(2) : $($(100))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
const tmpIfTest$1 /*:unknown*/ = $(30);
let tmpIfTest /*:boolean*/ /*ternaryConst*/ = false;
if (tmpIfTest$1) {
  a = $(2);
  tmpIfTest = a === tmpSwitchValue;
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
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
let a = undefined;
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = $(30);
let tmpIfTest = false;
if (tmpIfTest$1) {
  a = $(2);
  tmpIfTest = a === tmpSwitchValue;
} else {
  a = $($(100));
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
let a = undefined;
const b = $( 1 );
let c = 1;
const d = $( 30 );
let e = false;
if (d) {
  a = $( 2 );
  e = a === b;
}
else {
  const f = $( 100 );
  a = $( f );
  e = a === b;
}
if (e) {
  c = 0;
}
else {
  const g = 2 === b;
  if (g) {
    c = 2;
  }
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  a = $(2);
} else {
  let tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
const tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 = 2 === tmpSwitchValue;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`fail1`);
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $(`fail2`);
  $(a);
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 2
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
