# Preval test case

# empty_fallthrough_case_and_default.md

> Normalize > Switch > Empty fallthrough case and default
>
> Do cases spy

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
  default:
}
$();
`````

## Pre Normal

`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $spy(0)) {
  } else {
  }
}
$();
`````

## Normalized

`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $spy(0);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$();
`````

## Output

`````js filename=intro
$(1);
$spy(0);
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
