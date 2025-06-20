# Preval test case

# redundant_label_switch.md

> Normalize > Break > Redundant label switch
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: switch ($(100)) {
  case 1:
    $(1);
  break;
  case 2:
    $(2);
  case 100:
    $('yo');
  
    if ($(1)) {
      x = $(3);
    }
    if (x) {
      break exit;
    } else {
      x = $(4);
    }
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
const tmpSwitchValue /*:unknown*/ = $(100);
let tmpSwitchCaseToStart /*:number*/ = 3;
const tmpIfTest /*:boolean*/ = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpIfTest$3 /*:boolean*/ = 100 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
    }
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $(1);
} else {
  const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $(2);
  } else {
  }
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$9) {
    $(`yo`);
    const tmpIfTest$11 /*:unknown*/ = $(1);
    if (tmpIfTest$11) {
      x = $(3);
    } else {
    }
    if (x) {
    } else {
      $(4);
    }
  } else {
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
const tmpSwitchValue = $(100);
let tmpSwitchCaseToStart = 3;
if (1 === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (2 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 1;
  } else {
    if (100 === tmpSwitchValue) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(1);
} else {
  if (tmpSwitchCaseToStart <= 1) {
    $(2);
  }
  if (tmpSwitchCaseToStart <= 2) {
    $(`yo`);
    if ($(1)) {
      x = $(3);
    }
    if (!x) {
      $(4);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
const b = $( 100 );
let c = 3;
const d = 1 === b;
if (d) {
  c = 0;
}
else {
  const e = 2 === b;
  if (e) {
    c = 1;
  }
  else {
    const f = 100 === b;
    if (f) {
      c = 2;
    }
  }
}
const g = c <= 0;
if (g) {
  $( 1 );
}
else {
  const h = c <= 1;
  if (h) {
    $( 2 );
  }
  const i = c <= 2;
  if (i) {
    $( "yo" );
    const j = $( 1 );
    if (j) {
      a = $( 3 );
    }
    if (a) {

    }
    else {
      $( 4 );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(2);
exit: {
  let tmpSwitchValue = $(100);
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
        const tmpIfTest$3 = 100 === tmpSwitchValue;
        if (tmpIfTest$3) {
          tmpSwitchCaseToStart = 2;
        } else {
        }
      }
    }
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$5) {
      $(1);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$7) {
        $(2);
      } else {
      }
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$9) {
        $(`yo`);
        const tmpIfTest$11 = $(1);
        if (tmpIfTest$11) {
          x = $(3);
        } else {
        }
        if (x) {
          break exit;
        } else {
          x = $(4);
        }
      } else {
      }
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 'yo'
 - 4: 1
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
