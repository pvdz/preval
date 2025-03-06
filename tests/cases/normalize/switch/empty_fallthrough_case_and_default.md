# Preval test case

# empty_fallthrough_case_and_default.md

> Normalize > Switch > Empty fallthrough case and default
>
> Do cases spy

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
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ($spy(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
    }
  }
}
$();
`````

## Normalized


`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $spy(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
$();
`````

## Output


`````js filename=intro
$(1);
$spy(0);
$();
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$spy( 0 );
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
