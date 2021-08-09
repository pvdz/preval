# Preval test case

# swich_case_init.md

> Normalize > Hoisting > Func > Swich case init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    return $(`f`);
  };
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    f();
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    const tmpReturnArg = $(`f`);
    return tmpReturnArg;
  };
  const tmpSwitchDisc = $(1);
  const tmpIfTest = tmpSwitchDisc === 0;
  if (tmpIfTest) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
      f();
      break tmpSwitchBreak;
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpIfTest = tmpSwitchDisc === 0;
if (tmpIfTest) {
} else {
  const tmpIfTest$1 = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(`f`);
  } else {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
