# Preval test case

# default_no__str.md

> Normalize > Pattern > Binding > Arr > Rest > Default no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = 'abc';
$(x);
`````

## Pre Normal


`````js filename=intro
const [...x] = `abc`;
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = `abc`;
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternSplat = [`a`, `b`, `c`];
const x = arrPatternSplat.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = a.slice( 0 );
$( b );
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
