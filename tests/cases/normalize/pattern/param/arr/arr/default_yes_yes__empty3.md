# Preval test case

# default_yes_yes__empty3.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  empty3
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
let f = function (tmpParamBare) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    arrPatternBeforeDefault = ['pass3'][0];
    arrPatternStep = arrPatternBeforeDefault === undefined ? ['fail2'] : arrPatternBeforeDefault;
    arrPatternSplat$1 = [...arrPatternStep];
    return 'ok';
  } else {
  }
};
$(f());

`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    arrPatternBeforeDefault = [`pass3`][0];
    arrPatternStep = arrPatternBeforeDefault === undefined ? [`fail2`] : arrPatternBeforeDefault;
    arrPatternSplat$1 = [...arrPatternStep];
    return `ok`;
  } else {
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  let arrPatternSplat = undefined;
  let arrPatternBeforeDefault = undefined;
  let arrPatternStep = undefined;
  let arrPatternSplat$1 = undefined;
  if (tmpIfTest) {
    const tmpAssignRhsProp = [`pass3`];
    arrPatternBeforeDefault = tmpAssignRhsProp[0];
    const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
    if (tmpIfTest$1) {
      arrPatternStep = [`fail2`];
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
    arrPatternSplat$1 = [...arrPatternStep];
    return `ok`;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
