# Preval test case

# overflow.md

> Normalize > Switch > Kinds > Overflow
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    break;
  case 1:
    $('two');
  case 2:
    $('three');
    break;
  case 3:
    $('four');
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 4;
const tmpIfTest /*:boolean*/ = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 /*:boolean*/ = 1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpIfTest$3 /*:boolean*/ = 2 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpIfTest$5 /*:boolean*/ = 3 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
      }
    }
  }
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$7) {
  $(`one`);
} else {
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$9) {
    $(`two`);
  } else {
  }
  const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$11) {
    $(`three`);
  } else {
    const tmpIfTest$13 /*:boolean*/ = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$13) {
      $(`four`);
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 4;
if (0 === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if (1 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 1;
  } else {
    if (2 === tmpSwitchValue) {
      tmpSwitchCaseToStart = 2;
    } else {
      if (3 === tmpSwitchValue) {
        tmpSwitchCaseToStart = 3;
      }
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(`one`);
} else {
  if (tmpSwitchCaseToStart <= 1) {
    $(`two`);
  }
  if (tmpSwitchCaseToStart <= 2) {
    $(`three`);
  } else {
    if (tmpSwitchCaseToStart <= 3) {
      $(`four`);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 4;
const c = 0 === a;
if (c) {
  b = 0;
}
else {
  const d = 1 === a;
  if (d) {
    b = 1;
  }
  else {
    const e = 2 === a;
    if (e) {
      b = 2;
    }
    else {
      const f = 3 === a;
      if (f) {
        b = 3;
      }
    }
  }
}
const g = b <= 0;
if (g) {
  $( "one" );
}
else {
  const h = b <= 1;
  if (h) {
    $( "two" );
  }
  const i = b <= 2;
  if (i) {
    $( "three" );
  }
  else {
    const j = b <= 3;
    if (j) {
      $( "four" );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 4;
const tmpIfTest = 0 === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 2 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpIfTest$5 = 3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(`one`);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      $(`two`);
    } else {
    }
    const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$11) {
      $(`three`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$13 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$13) {
        $(`four`);
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
 - 1: 1
 - 2: 'two'
 - 3: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
