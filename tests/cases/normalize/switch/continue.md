# Preval test case

# continue_SKIP.md

> normalize > switch > continue_SKIP
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

Need to make sure the `continue` statements in the input still jump to the correct loop. So the loop has to get a label and the continues have to refer to that label.

If the loop already has a label, then that label ought to be used instead since labels cannot nest in this context.

#TODO

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

## Normalized

`````js filename=intro
let run = true;
while (run) {
  $(1);
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
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
      run = false;
      break tmpSwitchBreak;
    }
  }
}
`````

## Output

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
      run = false;
      break tmpSwitchBreak;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same