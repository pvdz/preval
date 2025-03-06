# Preval test case

# default_yes_no__arr_arr_elided.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  arr arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x] = $('pass')] = [[, , 1], 4, 5];
$(x);
`````

## Pre Normal


`````js filename=intro
const [[...x] = $(`pass`)] = [[, , 1], 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = [, , 1];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`pass`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const x /*:array*/ = [undefined, undefined, 1];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ undefined, undefined, 1 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [undefined, undefined, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice