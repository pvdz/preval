# Preval test case

# switch_func_hoisting_no_tdz.md

> Normalize > Hoisting > Func > Switch func hoisting no tdz
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
f(); // This should work
`````

## Pre Normal

`````js filename=intro
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
f();
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
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
f();
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
f();
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
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
