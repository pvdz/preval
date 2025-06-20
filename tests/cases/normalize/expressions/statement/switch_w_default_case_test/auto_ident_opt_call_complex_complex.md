# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $($)?.($(1)):
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
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
let tmpIfTest /*:boolean*/ /*ternaryConst*/ = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpBinLhs /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
  tmpIfTest = tmpClusterSSA_tmpBinLhs === tmpSwitchValue;
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
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
} else {
  const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
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
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall == null;
let tmpIfTest = false;
if (tmpIfTest$1) {
  tmpIfTest = undefined === tmpSwitchValue;
} else {
  tmpIfTest = $dotCall(tmpChainElementCall, $, undefined, $(1)) === tmpSwitchValue;
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
const c = $( $ );
const d = c == null;
let e = false;
if (d) {
  e = undefined === a;
}
else {
  const f = $( 1 );
  const g = $dotCall( c, $, undefined, f );
  e = g === a;
}
if (e) {
  b = 0;
}
else {
  const h = 2 === a;
  if (h) {
    b = 2;
  }
}
const i = b <= 0;
if (i) {

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
let a = { a: 999, b: 1000 };
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  let tmpCalleeParam = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, tmpCalleeParam);
  tmpBinLhs = tmpChainElementCall$1;
} else {
}
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
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
  if (tmpIfTest$5) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$7) {
      $(`fail1`);
    } else {
    }
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
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
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
