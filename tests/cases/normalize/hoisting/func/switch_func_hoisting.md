# Preval test case

# switch_func_hoisting.md

> Normalize > Hoisting > Func > Switch func hoisting
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    f();
    break;
  case $(2):
    function f() { $('pass'); }
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let f = function () {
    debugger;
    $(`pass`);
  };
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    f();
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
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
  const tmpSwitchDisc = $(1);
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
  }
}
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( "pass" );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
