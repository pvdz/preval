# Preval test case

# redundant_label_switch2.md

> Normalize > Break > Redundant label switch2
>
> If a labeled break does the same thing without the label then the label should be dropped

#TODO

## Input

`````js filename=intro
let x = $(2);
exit: {
  const tmpSwitchValue = $(100);
  let tmpSwitchCaseToStart = 3;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if (100 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(1);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(2);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`yo`);
      if ($(1)) {
        x = $(3);
      }
      if (x) {
        break exit;
      } else {
        x = $(4);
      }
    }
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(2);
exit: {
  const tmpSwitchValue = $(100);
  let tmpSwitchCaseToStart = 3;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if (100 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(1);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(2);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`yo`);
      if ($(1)) {
        x = $(3);
      }
      if (x) {
        break exit;
      } else {
        x = $(4);
      }
    }
  }
}
`````

## Normalized

`````js filename=intro
let x = $(2);
exit: {
  const tmpSwitchValue = $(100);
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 100 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  tmpSwitchBreak: {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$5) {
      $(1);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$7) {
        $(2);
      } else {
      }
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$9) {
        $(`yo`);
        const tmpIfTest$11 = $(1);
        if (tmpIfTest$11) {
          x = $(3);
        } else {
        }
        if (x) {
          break exit;
        } else {
          x = $(4);
        }
      } else {
      }
    }
  }
}
`````

## Output

`````js filename=intro
let x = $(2);
exit: {
  const tmpSwitchValue = $(100);
  let tmpSwitchCaseToStart = 3;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 100 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
      }
    }
  }
  tmpSwitchBreak: {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$5) {
      $(1);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$7) {
        $(2);
      } else {
      }
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$9) {
        $(`yo`);
        const tmpIfTest$11 = $(1);
        if (tmpIfTest$11) {
          x = $(3);
        } else {
        }
        if (x) {
          break exit;
        } else {
          $(4);
        }
      } else {
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 'yo'
 - 4: 1
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
