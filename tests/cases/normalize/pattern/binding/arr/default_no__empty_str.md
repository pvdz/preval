# Preval test case

# default_no__empty_str.md

> Normalize > Pattern > Binding > Arr > Default no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = '';
$('ok');
`````

## Pre Normal


`````js filename=intro
const [] = ``;
$(`ok`);
`````

## Normalized


`````js filename=intro
const bindingPatternArrRoot = ``;
const arrPatternSplat = [...bindingPatternArrRoot];
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
