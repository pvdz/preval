# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Arr > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[]] = 'abc');
$('ok');
`````

## Pre Normal


`````js filename=intro
[[]] = `abc`;
$(`ok`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = `abc`;
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
$(`ok`);
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope