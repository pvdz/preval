# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case b?.c.d.e?.(1):
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
let tmpIfTest /*:boolean*/ = false;
const tmpIfTest$3 /*:boolean*/ = $ == null;
if (tmpIfTest$3) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpIfTest = tmpChainElementCall === tmpSwitchValue;
}
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$5 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$5) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$7) {
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
let tmpIfTest = false;
if ($ == null) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  tmpIfTest = $dotCall($, { e: $ }, `e`, 1) === tmpSwitchValue;
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
let c = false;
const d = $ == null;
if (d) {
  c = undefined === a;
}
else {
  const e = { e: $ };
  const f = $dotCall( $, e, "e", 1 );
  c = f === a;
}
if (c) {
  b = 0;
}
else {
  const g = 2 === a;
  if (g) {
    b = 2;
  }
}
const h = b <= 0;
if (h) {

}
else {
  const i = b <= 1;
  if (i) {
    $( "fail1" );
    $( "fail2" );
  }
  else {
    $( "fail2" );
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
