# Preval test case

# default_no_no__arr_0.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x }] = [0, 20, 30];
$(x);
`````

## Pre Normal


`````js filename=intro
const [{ ...x }] = [0, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [0, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = [];
const x = objPatternRest(0, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( 0, a, undefined );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
