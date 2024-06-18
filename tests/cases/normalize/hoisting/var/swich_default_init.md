# Preval test case

# swich_default_init.md

> Normalize > Hoisting > Var > Swich default init
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
switch ($(1)) {
  default:
    var x = 10;
    break;
  case 1:
    x = 20;
    break;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      x = 10;
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      x = 20;
      break tmpSwitchBreak;
    }
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      x = 20;
      break tmpSwitchBreak;
    } else {
    }
  }
}
$(x);
`````

## Output


`````js filename=intro
const tmpSwitchValue = $(1);
let tmpIfTest$1 = true;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpIfTest$1 = false;
} else {
}
if (tmpIfTest$1) {
  $(10);
} else {
  $(20);
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
  $( 10 );
}
else {
  $( 20 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
