# Preval test case

# simple_looped_break.md

> Normalize > Switch > Simple abrupt cases > Simple looped break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    $('one');
    while ($(1)) {
      $(2);
      break;
    }
    // fall-through
  case 1:
    $('two');
    break;
  case 2:
    $('three');
    break;
  case 3:
    $('four');
    break;
  default:
    $('def');
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else if (3 === tmpSwitchValue) tmpSwitchCaseToStart = 3;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(`one`);
      while ($(1)) {
        $(2);
        break;
      }
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`two`);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`three`);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 3) {
      $(`four`);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 4) {
      $(`def`);
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 4;
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
      const tmpIfTest$5 = 3 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
      }
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(`one`);
    let tmpIfTest$9 = $(1);
    while (tmpIfTest$9) {
      $(2);
      break;
    }
  } else {
  }
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(`two`);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$13) {
      $(`three`);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$15) {
        $(`four`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
        if (tmpIfTest$17) {
          $(`def`);
        } else {
        }
      }
    }
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 4;
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
      const tmpIfTest$5 = 3 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
      }
    }
  }
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$7) {
  $(`one`);
  const tmpIfTest$9 = $(1);
  if (tmpIfTest$9) {
    $(2);
  } else {
  }
} else {
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$11) {
  $(`two`);
} else {
  const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$13) {
    $(`three`);
  } else {
    const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$15) {
      $(`four`);
    } else {
      $(`def`);
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
