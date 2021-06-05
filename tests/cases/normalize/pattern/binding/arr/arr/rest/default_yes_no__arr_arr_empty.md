# Preval test case

# default_yes_no__arr_arr_empty.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default yes no  arr arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x] = $('pass')] = [[], 4, 5];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[...x] = $('pass')] = [[], 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const tmpArrElement = [];
const bindingPatternArrRoot = [tmpArrElement, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('pass');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
