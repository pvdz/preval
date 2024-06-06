# Preval test case

# swich_default_init2.md

> Normalize > Hoisting > Func > Swich default init2
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
const x = $(1);
switch (x) {
  default:
    function f() { return $('f'); }
    break;
  case 1:
    f();
    break;
}
`````

## Pre Normal

`````js filename=intro
const x = $(1);
{
  let f = function () {
    debugger;
    return $(`f`);
  };
  const tmpSwitchValue = x;
  let tmpSwitchCaseToStart = 0;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      f();
      break tmpSwitchBreak;
    }
  }
}
`````

## Normalized

`````js filename=intro
const x = $(1);
let f = function () {
  debugger;
  const tmpReturnArg = $(`f`);
  return tmpReturnArg;
};
const tmpSwitchValue = x;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      f();
      break tmpSwitchBreak;
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
const x = $(1);
let tmpIfTest$1 = true;
const tmpIfTest = 1 === x;
if (tmpIfTest) {
  tmpIfTest$1 = false;
} else {
}
if (tmpIfTest$1) {
} else {
  $(`f`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = true;
const c = 1 === a;
if (c) {
  b = false;
}
if (b) {

}
else {
  $( "f" );
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
