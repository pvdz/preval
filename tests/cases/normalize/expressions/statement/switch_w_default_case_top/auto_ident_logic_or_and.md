# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Switch w default case top > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $($(0)) || ($($(1)) && $($(2)));
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
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest$5 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    const tmpIfTest$7 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$7) {
      const tmpCalleeParam$3 /*:unknown*/ = $(2);
      $(tmpCalleeParam$3);
    } else {
    }
  }
} else {
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$9) {
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
if ($(1) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  }
}
if (tmpSwitchCaseToStart <= 0) {
  if (!$($(0))) {
    if ($($(1))) {
      $($(2));
    }
  }
} else {
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
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = 2 === a;
  if (e) {
    b = 2;
  }
}
const f = b <= 0;
if (f) {
  const g = $( 0 );
  const h = $( g );
  if (h) {

  }
  else {
    const i = $( 1 );
    const j = $( i );
    if (j) {
      const k = $( 2 );
      $( k );
    }
  }
}
else {
  const l = b <= 1;
  if (l) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
