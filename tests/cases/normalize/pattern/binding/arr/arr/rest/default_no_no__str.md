# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Arr > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [[...x]] = 'abc';
$(x);
`````

## Pre Normal


`````js filename=intro
const [[...x]] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output


`````js filename=intro
const x /*:array*/ = [`a`];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a" ];
$( a );
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope