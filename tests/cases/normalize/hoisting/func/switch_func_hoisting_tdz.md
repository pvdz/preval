# Preval test case

# switch_func_hoisting_tdz.md

> Normalize > Hoisting > Func > Switch func hoisting tdz
>
> Func decl inside a switch block

## Input

`````js filename=intro
f(); // This should fail
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
f();
tmpSwitchBreak: {
  let f$1 = function () {
    debugger;
    $(`pass`);
  };
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    f$1();
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
  } else {
  }
}
`````

## Normalized


`````js filename=intro
tmpSwitchBreak: {
  f();
  let f$1 = function () {
    debugger;
    $(`pass`);
    return undefined;
  };
  const tmpSwitchDisc = $(1);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    f$1();
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
f();
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
f();
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

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
