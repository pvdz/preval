# Preval test case

# switch_func_hoisting2.md

> Normalize > Hoisting > Func > Switch func hoisting2
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
switch ($(2)) {
  case $(1):
    f();
    break;
  case $(2):
    f();
    function f() { $('pass'); }
    f();
}
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    $(`pass`);
  };
  const tmpSwitchDisc = $(2);
  if (tmpSwitchDisc === $(1)) {
    f();
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
    f();
    f();
  } else {
  }
}
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    $(`pass`);
    return undefined;
  };
  const tmpSwitchDisc = $(2);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    f();
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(2);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      f();
      f();
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchDisc = $(2);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`pass`);
} else {
  const tmpBinBothRhs$1 = $(2);
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(`pass`);
    $(`pass`);
  } else {
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 2
 - 4: 'pass'
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
