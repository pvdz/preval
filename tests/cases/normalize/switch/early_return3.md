# Preval test case

# early_return3.md

> Normalize > Switch > Early return3
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction)

## Input

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````


## Settled


`````js filename=intro
$(6);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$2 = 2 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    return 6;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
