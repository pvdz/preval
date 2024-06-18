# Preval test case

# switch_case.md

> Normalize > Pattern > Binding > Switch case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

## Input

`````js filename=intro
switch (0) {
  case 0:
    let [a, b] = [10, 20];
    $(a, b);
}
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  let b;
  const tmpSwitchDisc = 0;
  if (tmpSwitchDisc === 0) {
    [a, b] = [10, 20];
    $(a, b);
  } else {
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
const tmpSwitchDisc = 0;
const tmpIfTest = tmpSwitchDisc === 0;
if (tmpIfTest) {
  const arrAssignPatternRhs = [10, 20];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
} else {
}
`````

## Output


`````js filename=intro
$(10, 20);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10, 20 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
