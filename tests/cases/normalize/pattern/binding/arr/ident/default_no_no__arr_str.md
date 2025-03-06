# Preval test case

# default_no_no__arr_str.md

> Normalize > Pattern > Binding > Arr > Ident > Default no no  arr str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [x] = ['abc'];
$(x);
`````

## Pre Normal


`````js filename=intro
const [x] = [`abc`];
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = [`abc`];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output


`````js filename=intro
$(`abc`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope