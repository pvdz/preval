# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Param > Arr > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f('abc', 4, 5, 200));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[...x]] = tmpParamBare;
  return x;
};
$(f(`abc`, 4, 5, 200));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(`abc`, 4, 5, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arrPatternSplat$1 = [`a`];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a" ];
const b = a.slice( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
