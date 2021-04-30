# Preval test case

# early_return2.md

> Normalize > Switch > Early return2
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch (1) {
    case 0:
    case 1:
      return 6;
    case 2:
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = 1;
    let tmpSwitchCaseToStart = 3;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
      }
      if (tmpSwitchCaseToStart <= 1) {
        return 6;
      }
      if (tmpSwitchCaseToStart <= 2) {
      }
    }
  }
};
$(f());
`````

## Normalized

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
      const tmpIfTest$3 = 2 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    return 6;
  } else {
  }
  const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(6);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
