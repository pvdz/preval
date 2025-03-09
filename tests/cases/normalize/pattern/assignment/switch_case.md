# Preval test case

# switch_case.md

> Normalize > Pattern > Assignment > Switch case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
}
`````

## Settled


`````js filename=intro
$(30, 40);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30, 40);
`````

## Pre Normal


`````js filename=intro
tmpSwitchBreak: {
  let a;
  let b;
  const tmpSwitchDisc = 0;
  if (tmpSwitchDisc === 0) {
    a = 10;
    b = 20;
    [a, b] = [30, 40];
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
  a = 10;
  b = 20;
  const arrAssignPatternRhs = [30, 40];
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  $(a, b);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 30, 40 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 30, 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
