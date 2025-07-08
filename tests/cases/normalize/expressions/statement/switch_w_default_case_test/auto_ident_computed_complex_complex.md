# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(b)[$("c")]:
    break;
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
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`c`);
const tmpBinLhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
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
} else {
  const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $(`fail1`);
    $(`fail2`);
  } else {
    $(`fail2`);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpBinLhs = tmpCompObj[tmpCalleeParam];
let tmpSwitchCaseToStart = 1;
if (tmpBinLhs === tmpSwitchValue) {
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
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
const c = $( b );
const d = $( "c" );
const e = c[ d ];
let f = 1;
const g = e === a;
if (g) {
  f = 0;
}
else {
  const h = 2 === a;
  if (h) {
    f = 2;
  }
}
const i = f <= 0;
if (i) {

}
else {
  const j = f <= 1;
  if (j) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const k = {
  a: 999,
  b: 1000,
};
$( k, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCompObj = $(b);
const tmpCalleeParam = $(`c`);
const tmpBinLhs = tmpCompObj[tmpCalleeParam];
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
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
  if (tmpIfTest$3) {
    break tmpSwitchBreak;
  } else {
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
  }
}
$(a, b);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
