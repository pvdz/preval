# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident call prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b.$(1)):
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
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = $dotCall($, b, `\$`, 1);
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
const a = $dotCall($, { $: $ }, `\$`, 1);
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
const c = { $: $ };
const d = $dotCall( $, c, "$", 1 );
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
  $( d );
}
else {
  $( "fail2" );
  $( d );
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
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
