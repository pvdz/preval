# Preval test case

# default_no_no__arr_elided.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default no no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x }] = [, , , 20, 30];
$(x);
`````

## Pre Normal


`````js filename=intro
const [{ ...x }] = [, , , 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [, , , 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const tmpCalleeParam = arrPatternStep;
const tmpCalleeParam$1 = [];
const x = objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
$(x);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(undefined, tmpCalleeParam$1, undefined);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( undefined, a, undefined );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope