# Preval test case

# default_no__str.md

> Normalize > Pattern > Param > Arr > Rest > Default no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([...x]) {
  return x;
}
$(f('abc', 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [...x] = tmpParamBare;
  return x;
};
$(f(`abc`, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let x = arrPatternSplat.slice(0);
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(`abc`, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = [`a`, `b`, `c`];
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
