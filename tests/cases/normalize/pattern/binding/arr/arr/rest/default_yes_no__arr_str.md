# Preval test case

# default_yes_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x] = $('fail')] = ['abc', 4, 5];
$(x);
`````

## Pre Normal


`````js filename=intro
const [[...x] = $(`fail`)] = [`abc`, 4, 5];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [`abc`, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $(`fail`);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const x /*:array*/ = [`a`, `b`, `c`];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
