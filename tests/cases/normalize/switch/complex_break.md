# Preval test case

# complex_break.md

> Normalize > Switch > Complex break
>
> Breaks don't need to be toplevel to a case...

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1: {
    if (2) {
      $(3);
      break;
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
    fall = false;
  } else {
    $(4);
    fall = false;
  }
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = 1;
  if (tmpSwitchDisc === 1) {
    {
      if (2) {
        $(3);
        break tmpSwitchBreak;
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
