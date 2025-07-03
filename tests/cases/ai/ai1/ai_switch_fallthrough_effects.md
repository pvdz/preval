# Preval test case

# ai_switch_fallthrough_effects.md

> Ai > Ai1 > Ai switch fallthrough effects
>
> Test: Switch statement with fall-through and side effects.

## Input

`````js filename=intro
// Expected: (Complex if-else preserving concatenated effects on path)
let val = $('input');
let path = '';
switch (val) {
  case 1:
    path += $('A');
    // fall through
  case 2:
    path += $('B');
    break;
  case 3:
    path += $('C');
}
$('use', path);
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(`input`);
let path /*:string*/ /*ternaryConst*/ = ``;
let tmpSwitchCaseToStart /*:number*/ = 3;
const tmpIfTest /*:boolean*/ = 1 === val;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === val;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpIfTest$3 /*:boolean*/ = 3 === val;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
    }
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  const tmpBinBothRhs /*:unknown*/ = $(`A`);
  path = $coerce(tmpBinBothRhs, `plustr`);
} else {
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  const tmpBinBothRhs$1 /*:unknown*/ = $(`B`);
  const tmpClusterSSA_path /*:string*/ = path + tmpBinBothRhs$1;
  $(`use`, tmpClusterSSA_path);
} else {
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$9) {
    const tmpBinBothRhs$3 /*:unknown*/ = $(`C`);
    const tmpClusterSSA_path$1 /*:string*/ = path + tmpBinBothRhs$3;
    $(`use`, tmpClusterSSA_path$1);
  } else {
    $(`use`, path);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val = $(`input`);
let path = ``;
let tmpSwitchCaseToStart = 3;
if (1 === val) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === val) {
    tmpSwitchCaseToStart = 1;
  } else {
    if (3 === val) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  path = $(`A`) + ``;
}
if (tmpSwitchCaseToStart <= 1) {
  $(`use`, path + $(`B`));
} else {
  if (tmpSwitchCaseToStart <= 2) {
    $(`use`, path + $(`C`));
  } else {
    $(`use`, path);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "input" );
let b = "";
let c = 3;
const d = 1 === a;
if (d) {
  c = 0;
}
else {
  const e = 2 === a;
  if (e) {
    c = 1;
  }
  else {
    const f = 3 === a;
    if (f) {
      c = 2;
    }
  }
}
const g = c <= 0;
if (g) {
  const h = $( "A" );
  b = $coerce( h, "plustr" );
}
const i = c <= 1;
if (i) {
  const j = $( "B" );
  const k = b + j;
  $( "use", k );
}
else {
  const l = c <= 2;
  if (l) {
    const m = $( "C" );
    const n = b + m;
    $( "use", n );
  }
  else {
    $( "use", b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val = $(`input`);
let path = ``;
let tmpSwitchValue = val;
let tmpSwitchCaseToStart = 3;
const tmpIfTest = 1 === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    const tmpBinBothLhs = path;
    const tmpBinBothRhs = $(`A`);
    path = tmpBinBothLhs + tmpBinBothRhs;
  } else {
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    const tmpBinBothLhs$1 = path;
    const tmpBinBothRhs$1 = $(`B`);
    path = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
      const tmpBinBothLhs$3 = path;
      const tmpBinBothRhs$3 = $(`C`);
      path = tmpBinBothLhs$3 + tmpBinBothRhs$3;
    } else {
    }
  }
}
$(`use`, path);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'input'
 - 2: 'use', ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
