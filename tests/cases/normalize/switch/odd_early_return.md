# Preval test case

# odd_early_return.md

> Normalize > Switch > Odd early return
>
> Sorting out the branching stuff

## Input

`````js filename=intro
function f() {
  switch ($(1)) {                         
    case 0:                               
      $(2);                               
      break;                              
    case $(1):                            
      if ($(8)) {                         
        if ($(9)) {                       
          return $(10);                   
        } else {                          
          $(11);                          
        }

        if ($(2)) {
          $(13);
        } else {
          return $(14);
        }
      }
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
}
$(f());
`````


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
$inlinedFunction: {
  const tmpSwitchValue /*:unknown*/ = $(1);
  let tmpSwitchCaseToStart /*:number*/ = 4;
  const tmpIfTest /*:boolean*/ = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs /*:unknown*/ = $(1);
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$1 /*:unknown*/ = $(4);
      const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$3 /*:unknown*/ = $(7);
        const tmpIfTest$5 /*:boolean*/ = tmpBinLhs$3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(2);
  } else {
    const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      const tmpIfTest$11 /*:unknown*/ = $(8);
      if (tmpIfTest$11) {
        const tmpIfTest$13 /*:unknown*/ = $(9);
        if (tmpIfTest$13) {
          tmpCalleeParam = $(10);
          break $inlinedFunction;
        } else {
          $(11);
          const tmpIfTest$15 /*:unknown*/ = $(2);
          if (tmpIfTest$15) {
            $(13);
            $(3);
          } else {
            tmpCalleeParam = $(14);
            break $inlinedFunction;
          }
        }
      } else {
        $(3);
      }
    } else {
    }
    const tmpIfTest$17 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$17) {
      $(5);
      tmpCalleeParam = $(6);
    } else {
    }
  }
}
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
$inlinedFunction: {
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  if (0 === tmpSwitchValue) {
    tmpSwitchCaseToStart = 0;
  } else {
    if ($(1) === tmpSwitchValue) {
      tmpSwitchCaseToStart = 1;
    } else {
      if ($(4) === tmpSwitchValue) {
        tmpSwitchCaseToStart = 2;
      } else {
        if ($(7) === tmpSwitchValue) {
          tmpSwitchCaseToStart = 3;
        }
      }
    }
  }
  if (tmpSwitchCaseToStart <= 0) {
    $(2);
  } else {
    if (tmpSwitchCaseToStart <= 1) {
      if ($(8)) {
        if ($(9)) {
          tmpCalleeParam = $(10);
          break $inlinedFunction;
        } else {
          $(11);
          if ($(2)) {
            $(13);
            $(3);
          } else {
            tmpCalleeParam = $(14);
            break $inlinedFunction;
          }
        }
      } else {
        $(3);
      }
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(5);
      tmpCalleeParam = $(6);
    }
  }
}
$(tmpCalleeParam);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  const b = $( 1 );
  let c = 4;
  const d = 0 === b;
  if (d) {
    c = 0;
  }
  else {
    const e = $( 1 );
    const f = e === b;
    if (f) {
      c = 1;
    }
    else {
      const g = $( 4 );
      const h = g === b;
      if (h) {
        c = 2;
      }
      else {
        const i = $( 7 );
        const j = i === b;
        if (j) {
          c = 3;
        }
      }
    }
  }
  const k = c <= 0;
  if (k) {
    $( 2 );
  }
  else {
    const l = c <= 1;
    if (l) {
      const m = $( 8 );
      if (m) {
        const n = $( 9 );
        if (n) {
          a = $( 10 );
          break $inlinedFunction;
        }
        else {
          $( 11 );
          const o = $( 2 );
          if (o) {
            $( 13 );
            $( 3 );
          }
          else {
            a = $( 14 );
            break $inlinedFunction;
          }
        }
      }
      else {
        $( 3 );
      }
    }
    const p = c <= 2;
    if (p) {
      $( 5 );
      a = $( 6 );
    }
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 8
 - 4: 9
 - 5: 10
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
