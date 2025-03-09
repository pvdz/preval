# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base inner def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const a = 10;
([[ x = a ]] = [[]]);
$(a);
`````

## Settled


`````js filename=intro
x = 10;
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = 10;
$(10);
`````

## Pre Normal


`````js filename=intro
const a = 10;
[[x = a]] = [[]];
$(a);
`````

## Normalized


`````js filename=intro
const a = 10;
const tmpArrElement = [];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault = arrPatternSplat$1[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
  $(a);
} else {
  x = arrPatternBeforeDefault;
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
x = 10;
$( 10 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
