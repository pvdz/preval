# Preval test case

# ai_rule338_switch_opaque_fallthrough_default.md

> Ai > Ai3 > Ai rule338 switch opaque fallthrough default
>
> Test: Switch on opaque, cases with opaque calls, fall-through, and default.

## Input

`````js filename=intro
// Expected: switch($('key')) { case 'a': $('A'); case 'b': $('B'); break; default: $('D'); }
let discriminant = $('discriminant');
switch (discriminant) {
  case $('caseValA', 'valA'):
    $('actionA');
    // Fall-through
  case $('caseValB', 'valB'):
    $('actionB');
    break;
  case $('caseValC', 'valC'):
    $('actionC');
    break;
  default:
    $('actionDefault');
}
$('done_switch');
`````


## Settled


`````js filename=intro
const discriminant /*:unknown*/ = $(`discriminant`);
const tmpBinLhs /*:unknown*/ = $(`caseValA`, `valA`);
let tmpSwitchCaseToStart /*:number*/ = 3;
const tmpIfTest /*:boolean*/ = tmpBinLhs === discriminant;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(`caseValB`, `valB`);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === discriminant;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$3 /*:unknown*/ = $(`caseValC`, `valC`);
    const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$3 === discriminant;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
    }
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $(`actionA`);
} else {
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`actionB`);
  $(`done_switch`);
} else {
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$9) {
    $(`actionC`);
    $(`done_switch`);
  } else {
    $(`actionDefault`);
    $(`done_switch`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const discriminant = $(`discriminant`);
const tmpBinLhs = $(`caseValA`, `valA`);
let tmpSwitchCaseToStart = 3;
if (tmpBinLhs === discriminant) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(`caseValB`, `valB`) === discriminant) {
    tmpSwitchCaseToStart = 1;
  } else {
    if ($(`caseValC`, `valC`) === discriminant) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(`actionA`);
}
if (tmpSwitchCaseToStart <= 1) {
  $(`actionB`);
  $(`done_switch`);
} else {
  if (tmpSwitchCaseToStart <= 2) {
    $(`actionC`);
    $(`done_switch`);
  } else {
    $(`actionDefault`);
    $(`done_switch`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "discriminant" );
const b = $( "caseValA", "valA" );
let c = 3;
const d = b === a;
if (d) {
  c = 0;
}
else {
  const e = $( "caseValB", "valB" );
  const f = e === a;
  if (f) {
    c = 1;
  }
  else {
    const g = $( "caseValC", "valC" );
    const h = g === a;
    if (h) {
      c = 2;
    }
  }
}
const i = c <= 0;
if (i) {
  $( "actionA" );
}
const j = c <= 1;
if (j) {
  $( "actionB" );
  $( "done_switch" );
}
else {
  const k = c <= 2;
  if (k) {
    $( "actionC" );
    $( "done_switch" );
  }
  else {
    $( "actionDefault" );
    $( "done_switch" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let discriminant = $(`discriminant`);
let tmpSwitchValue = discriminant;
let tmpSwitchCaseToStart = 3;
const tmpBinLhs = $(`caseValA`, `valA`);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = $(`caseValB`, `valB`);
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$3 = $(`caseValC`, `valC`);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $(`actionA`);
  } else {
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $(`actionB`);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
      $(`actionC`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$11 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$11) {
        $(`actionDefault`);
      } else {
      }
    }
  }
}
$(`done_switch`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'discriminant'
 - 2: 'caseValA', 'valA'
 - 3: 'caseValB', 'valB'
 - 4: 'caseValC', 'valC'
 - 5: 'actionDefault'
 - 6: 'done_switch'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
