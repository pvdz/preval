# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ($($(1)) && $($(1))) || $($(2)):
    break;
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
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpBinLhs /*:unknown*/ = $(tmpCalleeParam);
if (tmpBinLhs) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpBinLhs = $(tmpCalleeParam$1);
} else {
}
let tmpIfTest /*:boolean*/ = false;
if (tmpBinLhs) {
  tmpIfTest = tmpBinLhs === tmpSwitchValue;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpBinLhs /*:unknown*/ = $(tmpCalleeParam$3);
  tmpIfTest = tmpClusterSSA_tmpBinLhs === tmpSwitchValue;
}
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
} else {
  const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = $($(1));
if (tmpBinLhs) {
  tmpBinLhs = $($(1));
}
let tmpIfTest = false;
if (tmpBinLhs) {
  tmpIfTest = tmpBinLhs === tmpSwitchValue;
} else {
  tmpIfTest = $($(2)) === tmpSwitchValue;
}
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (!(tmpSwitchCaseToStart <= 0)) {
  if (tmpSwitchCaseToStart <= 1) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( 1 );
let d = $( c );
if (d) {
  const e = $( 1 );
  d = $( e );
}
let f = false;
if (d) {
  f = d === a;
}
else {
  const g = $( 2 );
  const h = $( g );
  f = h === a;
}
if (f) {
  b = 0;
}
else {
  const i = 2 === a;
  if (i) {
    b = 2;
  }
}
const j = b <= 0;
if (j) {

}
else {
  const k = b <= 1;
  if (k) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const l = {
  a: 999,
  b: 1000,
};
$( l );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
