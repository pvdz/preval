# Preval test case

# pattern_sequence_simple_tdz.md

> Normalize > Binding > Case-block > Pattern sequence simple tdz
>
> Assignments of all kinds should be normalized in all circumstances

TDZ case

#TODO

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = ($(x), $(y), z); break; }
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
tmpSwitchBreak: {
  let x$1;
  let y$1;
  const tmpSwitchDisc = $(`a`);
  if (tmpSwitchDisc === $(`a`)) {
    [x$1, y$1] = ($(x$1), $(y$1), z);
    break tmpSwitchBreak;
  } else {
  }
}
$(x, y, z);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let x$1 = undefined;
  let y$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(x$1);
    $(y$1);
    const arrAssignPatternRhs = z;
    const arrPatternSplat = [...arrAssignPatternRhs];
    x$1 = arrPatternSplat[0];
    y$1 = arrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
  }
}
$(x, y, z);
`````

## Output


`````js filename=intro
const z = [10, 20, 30];
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(undefined);
  $(undefined);
  const arrPatternSplat = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
} else {
}
$(1, 2, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = $( "a" );
const c = $( "a" );
const d = b === c;
if (d) {
  $( undefined );
  $( undefined );
  const e = [ ... a ];
  e[ 0 ];
  e[ 1 ];
}
$( 1, 2, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
