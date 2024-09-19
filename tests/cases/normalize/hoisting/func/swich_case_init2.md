# Preval test case

# swich_case_init2.md

> Normalize > Hoisting > Func > Swich case init2
>
> Vars can be declared in a switch case

## Input

`````js filename=intro
switch ($(1)) {
  case 0:
    function f() { return $(x, 'x'); }
    break;
  case 1:
    const x = 100; // The func still needs access to this binding... very unusual...
    f();
    break;
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let x;
  let f = function () {
    debugger;
    return $(x, `x`);
  };
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === 0) {
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === 1) {
    x = 100;
    f();
    break tmpSwitchBreak;
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  let x = undefined;
  let f = function () {
    debugger;
    const tmpReturnArg = $(x, `x`);
    return tmpReturnArg;
  };
  const tmpSwitchDisc = $(1);
  const tmpIfTest = tmpSwitchDisc === 0;
  if (tmpIfTest) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$1 = tmpSwitchDisc === 1;
    if (tmpIfTest$1) {
      x = 100;
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
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === 0;
if (tmpIfTest) {
} else {
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 1;
  if (tmpIfTest$1) {
    $(100, `x`);
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a === 0;
if (b) {

}
else {
  const c = a === 1;
  if (c) {
    $( 100, "x" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100, 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
