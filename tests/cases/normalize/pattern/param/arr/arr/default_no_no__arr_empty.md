# Preval test case

# default_no_no__arr_empty.md

> Normalize > Pattern > Param > Arr > Arr > Default no no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[]]) {
  return 'bad';
}
$(f([], 200));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[]] = tmpParamBare;
  return `bad`;
};
$(f([], 200));
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
  return `bad`;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = [];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 200);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope