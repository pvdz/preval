# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident new computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      new (1, 2, $(b))["$"](1);
    }
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
  const b /*:object*/ /*truthy*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  new tmpNewCallee(1);
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
  const tmpNewCallee = $({ $: $ }).$;
  new tmpNewCallee(1);
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
  const g = { $: $ };
  const h = $( g );
  const i = h.$;
  new i( 1 );
}
else {
  const j = b <= 1;
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
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
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
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    new tmpNewCallee(1);
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
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
