# Preval test case

# continue2.md

> Normalize > Switch > Continue2
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

This was (at some point) an intermediate state after one cycle.

## Input

`````js filename=intro
  let run = true;
  while (run) {
    $(1);
    let tmpSwitchCaseToStart = 1;
    const tmpIfTest = 1 === 1;
    if (tmpIfTest) {
      tmpSwitchCaseToStart = 0;
    } else {
      const tmpIfTest$1 = 2 === 1;
      if (tmpIfTest$1) {
        tmpSwitchCaseToStart = 2;
      }
    }
    tmpSwitchBreak: {
      const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$2) {
        run = false;
        break tmpSwitchBreak;
      }
      const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$3) {
        continue;
      }
      const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$4) {
        let SSA_run = false;
        break tmpSwitchBreak;
      }
    }
  }
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let run = true;
while (true) {
  if (run) {
    $continue: {
      $(1);
      let tmpSwitchCaseToStart = 1;
      const tmpIfTest = true;
      tmpSwitchBreak: {
        if (tmpIfTest) {
          tmpSwitchCaseToStart = 0;
        } else {
          const tmpIfTest$1 = false;
          if (tmpIfTest$1) {
            tmpSwitchCaseToStart = 2;
          } else {
          }
        }
        const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
        if (tmpIfTest$2) {
          run = false;
          break tmpSwitchBreak;
        } else {
          const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
          if (tmpIfTest$3) {
            break $continue;
          } else {
            const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
            if (tmpIfTest$4) {
              let SSA_run = false;
              break tmpSwitchBreak;
            } else {
            }
          }
        }
      }
    }
  } else {
    break;
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
