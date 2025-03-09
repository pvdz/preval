# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)):
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
const tmpIfTest$1 /*:unknown*/ = $(30);
let tmpIfTest /*:boolean*/ = false;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpBinLhs /*:unknown*/ = $(60);
  tmpIfTest = tmpClusterSSA_tmpBinLhs === tmpSwitchValue;
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpBinLhs$1 /*:unknown*/ = $(tmpCalleeParam);
  tmpIfTest = tmpClusterSSA_tmpBinLhs$1 === tmpSwitchValue;
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
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = $(30);
let tmpIfTest = false;
if (tmpIfTest$1) {
  tmpIfTest = $(60) === tmpSwitchValue;
} else {
  tmpIfTest = $($(100)) === tmpSwitchValue;
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

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if (((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      break tmpSwitchBreak;
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
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpBinLhs = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpBinLhs = $(tmpCalleeParam);
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

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( 30 );
let d = false;
if (c) {
  const e = $( 60 );
  d = e === a;
}
else {
  const f = $( 100 );
  const g = $( f );
  d = g === a;
}
if (d) {
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - 4: 'fail1'
 - 5: 'fail2'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
