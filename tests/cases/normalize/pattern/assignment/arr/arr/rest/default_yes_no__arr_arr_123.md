# Preval test case

# default_yes_no__arr_arr_123.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default yes no  arr arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x] = $('fail')] = [[1, 2, 3], 4, 5]);
$(x);
`````

## Pre Normal


`````js filename=intro
[[...x] = $(`fail`)] = [[1, 2, 3], 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [1, 2, 3];
const arrAssignPatternRhs = [tmpArrElement, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternSplat$1 = [1, 2, 3];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
x = a.slice( 0 );
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
