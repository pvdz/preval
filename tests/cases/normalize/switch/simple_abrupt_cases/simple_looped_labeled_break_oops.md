# Preval test case

# simple_looped_labeled_break_oops.md

> Normalize > Switch > Simple abrupt cases > Simple looped labeled break oops
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

## Input

`````js filename=intro
function f() {
  switch ($(1)) {
    case 0:
      $('one');
      oops: while ($(1)) {
        $(2);
        break oops;
      }
      // fall-through
    case 1:
      $('two');
      break;
    case 2:
      $('three');
      break;
    case 3:
      $('four');
      break;
    default:
      $('def');
  }  
}
$(f());
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
  const tmpIfTest$9 /*:unknown*/ = $(1);
  if (tmpIfTest$9) {
    $(2);
  } else {
  }
} else {
}
const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$11) {
  $(`two`);
  $(undefined);
} else {
  const tmpIfTest$13 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$13) {
    $(`three`);
    $(undefined);
  } else {
    const tmpIfTest$15 /*:boolean*/ = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$15) {
      $(`four`);
      $(undefined);
    } else {
      $(`def`);
      $(undefined);
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
  if ($(1)) {
    $(2);
  }
}
if (tmpSwitchCaseToStart <= 1) {
  $(`two`);
  $(undefined);
} else {
  if (tmpSwitchCaseToStart <= 2) {
    $(`three`);
    $(undefined);
  } else {
    if (tmpSwitchCaseToStart <= 3) {
      $(`four`);
      $(undefined);
    } else {
      $(`def`);
      $(undefined);
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
  const h = $( 1 );
  if (h) {
    $( 2 );
  }
}
const i = b <= 1;
if (i) {
  $( "two" );
  $( undefined );
}
else {
  const j = b <= 2;
  if (j) {
    $( "three" );
    $( undefined );
  }
  else {
    const k = b <= 3;
    if (k) {
      $( "four" );
      $( undefined );
    }
    else {
      $( "def" );
      $( undefined );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
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
    while (true) {
      const tmpIfTest$9 = $(1);
      if (tmpIfTest$9) {
        $(2);
        break;
      } else {
        break;
      }
    }
  } else {
  }
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(`two`);
    return undefined;
  } else {
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$13) {
      $(`three`);
      return undefined;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$15) {
        $(`four`);
        return undefined;
      } else {
        const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
        if (tmpIfTest$17) {
          $(`def`);
          return undefined;
        } else {
          return undefined;
        }
      }
    }
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'two'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
