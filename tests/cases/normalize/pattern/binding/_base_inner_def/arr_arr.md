# Preval test case

# arr_arr.md

> Normalize > Pattern > Binding > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [[ x = a ]] = [[]];
`````

## Settled


`````js filename=intro
a;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
a;
`````

## Pre Normal


`````js filename=intro
const [[x = a]] = [[]];
`````

## Normalized


`````js filename=intro
const tmpArrElement = [];
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = arrPatternBeforeDefault;
}
`````

## PST Settled
With rename=true

`````js filename=intro
a;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope