# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident unary plus simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case +arg:
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ /*ternaryConst*/ = 1;
const tmpIfTest /*:boolean*/ = 1 === tmpSwitchValue;
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
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
if (1 === tmpSwitchValue) {
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
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = 1 === a;
if (c) {
  b = 0;
}
else {
  const d = 2 === a;
  if (d) {
    b = 2;
  }
}
const e = b <= 0;
if (e) {

}
else {
  const f = b <= 1;
  if (f) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = +arg;
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
$(a, arg);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
