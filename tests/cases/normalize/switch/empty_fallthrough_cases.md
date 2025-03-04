# Preval test case

# empty_fallthrough_cases.md

> Normalize > Switch > Empty fallthrough cases
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
  case $spy(0):
  case $spy(1):
}
$();
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $spy(0) || tmpSwitchDisc === $spy(1)) {
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
let tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs$1 = tmpSwitchDisc;
  const tmpBinBothRhs$1 = $spy(1);
  tmpIfTest = tmpBinBothLhs$1 === tmpBinBothRhs$1;
}
$();
`````

## Output


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $spy(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
} else {
  $spy(1);
}
$();
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $spy( 0 );
const c = a === b;
if (c) {

}
else {
  $spy( 1 );
}
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'Creating spy', 1, 1, [0, 0]
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
