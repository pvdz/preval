# Preval test case

# default_yes_no__arr_elided.md

> Normalize > Pattern > Param > Arr > Arr > Default yes no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
}
$(f([, , , , 4, 5], 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[] = $([`pass2`])] = tmpParamBare;
  return `ok`;
};
$(f([, , , , 4, 5], 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = [`pass2`];
    arrPatternStep = tmpCallCallee(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  return `ok`;
};
const tmpCallCallee$1 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = [, , , , 4, 5];
const tmpCalleeParam$5 = 200;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3, tmpCalleeParam$5);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`pass2`];
const arrPatternStep = $(tmpCalleeParam);
[...arrPatternStep];
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2" ];
const b = $( a );
[ ... b ];
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
