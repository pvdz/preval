# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Switch w default case top > Auto ident call computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (1, 2, $(b))["$"](1);
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
  const b /*:object*/ /*truthy*/ = { $: $ };
  const tmpMCOO /*:unknown*/ = $(b);
  const tmpMCF /*:unknown*/ = tmpMCOO.$;
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
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
  const tmpMCOO = $({ $: $ });
  a = tmpMCOO.$(1);
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
  const h = { $: $ };
  const i = $( h );
  const j = i.$;
  a = $dotCall( j, i, "$", 1 );
}
const k = c <= 1;
if (k) {
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
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
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
  const tmpMCOO = $(b);
  const tmpMCF = tmpMCOO.$;
  a = $dotCall(tmpMCF, tmpMCOO, `\$`, 1);
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(`fail1`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
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
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
