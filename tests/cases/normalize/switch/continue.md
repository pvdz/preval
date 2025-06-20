# Preval test case

# continue.md

> Normalize > Switch > Continue
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

Need to make sure the `continue` statements in the input still jump to the correct loop. So the loop has to get a label and the continues have to refer to that label.

If the loop already has a label, then that label ought to be used instead since labels cannot nest in this context.

## Input

`````js filename=intro
let run = true;
while (run) {
  $(1);
  switch (1) {
    case 1:
      run = false;
      break;
    default:
      continue;
    case 2:
      run = false;
      break;
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
      let tmpSwitchValue = 1;
      let tmpSwitchCaseToStart = 1;
      const tmpIfTest = 1 === tmpSwitchValue;
      tmpSwitchBreak: {
        if (tmpIfTest) {
          tmpSwitchCaseToStart = 0;
        } else {
          const tmpIfTest$1 = 2 === tmpSwitchValue;
          if (tmpIfTest$1) {
            tmpSwitchCaseToStart = 2;
          } else {
          }
        }
        const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
        if (tmpIfTest$3) {
          run = false;
          break tmpSwitchBreak;
        } else {
          const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
          if (tmpIfTest$5) {
            break $continue;
          } else {
            const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
            if (tmpIfTest$7) {
              run = false;
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
