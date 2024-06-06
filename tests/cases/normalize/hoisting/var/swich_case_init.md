# Preval test case

# swich_case_init.md

> Normalize > Hoisting > Var > Swich case init
>
> Vars can be declared in a switch case

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
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
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    x = 10;
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    x = 20;
    break tmpSwitchBreak;
  } else {
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  const tmpIfTest = tmpSwitchDisc === 0;
  if (tmpIfTest) {
    x = 10;
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
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
let x = undefined;
const tmpSwitchDisc = $(1);
const tmpIfTest = tmpSwitchDisc === 0;
if (tmpIfTest) {
  x = 10;
} else {
  const tmpIfTest$1 = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    x = 20;
  } else {
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
const c = b === 0;
if (c) {
  a = 10;
}
else {
  const d = b === 1;
  if (d) {
    a = 20;
  }
}
$( a );
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
