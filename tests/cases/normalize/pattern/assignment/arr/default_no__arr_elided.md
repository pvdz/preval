# Preval test case

# default_no__arr_elided.md

> Normalize > Pattern > Assignment > Arr > Default no  arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([] = [, , 1]);
$('ok');
`````

## Pre Normal


`````js filename=intro
[] = [, , 1];
$(`ok`);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [, , 1];
const arrPatternSplat = [...arrAssignPatternRhs];
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
