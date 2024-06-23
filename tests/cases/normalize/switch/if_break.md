# Preval test case

# if_break.md

> Normalize > Switch > If break
>
> Breaks don't need to be toplevel to a case...

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
      break;
    }
  }
  case 4: {
    if (5) {
      $(6);
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
{
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (4 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        if (2) {
          $(3);
          break tmpSwitchBreak;
        }
      }
    }
    if (tmpSwitchCaseToStart <= 1) {
      {
        if (5) {
          $(6);
          break tmpSwitchBreak;
        }
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpIfTest = 1 === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 4 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $(3);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $(6);
      break tmpSwitchBreak;
    } else {
    }
  }
}
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
