# Preval test case

# nested_switch_unique_labels.md

> Normalize > Label > Nested switch unique labels
>
> Label generation was broken at some point and would generate identical label names, causing this to fail.

#TODO

## Input

`````js filename=intro
switch ($) {
  case 3:
    switch ($) {
      case 3:
        break;
    }
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = $;
  let tmpSwitchCaseToStart = 1;
  if (3 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        const tmpSwitchValue$1 = $;
        let tmpSwitchCaseToStart$1 = 1;
        if (3 === tmpSwitchValue$1) tmpSwitchCaseToStart$1 = 0;
        else;
        tmpSwitchBreak$1: {
          if (tmpSwitchCaseToStart$1 <= 0) {
            break tmpSwitchBreak$1;
          }
        }
      }
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = $;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 3 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpSwitchValue$1 = $;
  let tmpSwitchCaseToStart$1 = 1;
  const tmpIfTest$3 = 3 === tmpSwitchValue$1;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart$1 = 0;
  } else {
  }
  tmpSwitchBreak$1: {
    const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$5) {
      break tmpSwitchBreak$1;
    } else {
    }
  }
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = 3 === $;
if (tmpIfTest) {
  let tmpSwitchCaseToStart$1 = 1;
  const tmpIfTest$3 = 3 === $;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart$1 = 0;
  } else {
  }
  tmpSwitchBreak$1: {
    const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$5) {
      break tmpSwitchBreak$1;
    } else {
    }
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
