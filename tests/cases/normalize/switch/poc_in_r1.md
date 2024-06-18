# Preval test case

# poc_in_r1.md

> Normalize > Switch > Poc in r1
>
> Fall through example

Regression case

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
}
`````

## Pre Normal


`````js filename=intro
let x = 1;
tmpSwitchBreak: {
  const tmpSwitchDisc = x;
  if (tmpSwitchDisc === $(1)) {
    $(`A`);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpSwitchDisc = x;
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(`A`);
} else {
}
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(1);
const tmpIfTest = 1 === tmpBinBothRhs;
if (tmpIfTest) {
  $(`A`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 === a;
if (b) {
  $( "A" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
