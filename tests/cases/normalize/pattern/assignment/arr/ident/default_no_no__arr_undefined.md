# Preval test case

# default_no_no__arr_undefined.md

> Normalize > Pattern > Assignment > Arr > Ident > Default no no  arr undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([x] = [undefined]);
$(x);
`````

## Pre Normal


`````js filename=intro
[x] = [undefined];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [undefined];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Output


`````js filename=intro
x = undefined;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = undefined;
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope