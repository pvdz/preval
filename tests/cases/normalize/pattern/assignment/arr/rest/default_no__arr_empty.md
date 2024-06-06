# Preval test case

# default_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Rest > Default no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = []);
$(x);
`````

## Pre Normal


`````js filename=intro
[...x] = [];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Output


`````js filename=intro
const arrPatternSplat = [];
x = arrPatternSplat.slice(0);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
x = a.slice( 0 );
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
