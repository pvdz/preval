# Preval test case

# complex_break_counter.md

> Normalize > Switch > Complex break counter
>
> Breaks don't need to be toplevel to a case...

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
    }
    $(4);
    break;
  }
  case 'no': break;
}
`````

`````js filename=into
let fall = false;
if (1 === 1) {
  if (2) {
    $(3);
  } 
  $(4);
  fall = false;
}
`````

## Settled


`````js filename=intro
$(3);
$(4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    {
      if (2) {
        $(3);
      }
      $(4);
      break tmpSwitchBreak;
    }
  } else if (tmpSwitchDisc === `no`) {
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = 1;
  const tmpIfTest = tmpSwitchDisc === 1;
  if (tmpIfTest) {
    $(3);
    $(4);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === `no`;
    if (tmpIfTest$1) {
      break tmpSwitchBreak;
    } else {
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
