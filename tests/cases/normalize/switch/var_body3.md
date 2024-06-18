# Preval test case

# var_body3.md

> Normalize > Switch > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    var x;
    break;
  case $(2):
    $(11);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    undefined;
    break tmpSwitchBreak;
  } else if (tmpSwitchDisc === $(2)) {
    $(11);
  } else {
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    break tmpSwitchBreak;
  } else {
    const tmpBinBothLhs$1 = tmpSwitchDisc;
    const tmpBinBothRhs$1 = $(2);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(11);
    } else {
    }
  }
}
$(x);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
} else {
  const tmpBinBothRhs$1 = $(2);
  const tmpIfTest$1 = tmpSwitchDisc === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    $(11);
  } else {
  }
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {

}
else {
  const d = $( 2 );
  const e = a === d;
  if (e) {
    $( 11 );
  }
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
