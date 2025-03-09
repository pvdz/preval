# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $(b)?.[$("$")]?.($(1))):
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
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`\$`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
  }
}
const tmpIfTest /*:boolean*/ = a === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$5 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$5) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$9) {
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
let a = undefined;
const tmpChainElementCall = $({ $: $ });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
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

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ((a = $(b)?.[$(`\$`)]?.($(1))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpCalleeParam = tmpChainElementObject;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$5 = 2 === tmpSwitchValue;
  if (tmpIfTest$5) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$9) {
  $(`fail1`);
} else {
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$11) {
  $(`fail2`);
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
let c = undefined;
const d = { $: $ };
const e = $( d );
const f = e == null;
if (f) {

}
else {
  const g = $( "$" );
  const h = e[ g ];
  const i = h == null;
  if (i) {

  }
  else {
    const j = $( 1 );
    const k = $dotCall( h, e, undefined, j );
    c = k;
  }
}
const l = c === a;
if (l) {
  b = 0;
}
else {
  const m = 2 === a;
  if (m) {
    b = 2;
  }
}
const n = b <= 1;
if (n) {
  $( "fail1" );
  $( "fail2" );
  $( c );
}
else {
  $( "fail2" );
  $( c );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
