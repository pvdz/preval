# Preval test case

# default_no__str.md

> Normalize > Pattern > Binding > Arr > Default no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = 'xyz';
$('ok');
`````

## Pre Normal

`````js filename=intro
const [] = `xyz`;
$(`ok`);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = `xyz`;
const arrPatternSplat = [...bindingPatternArrRoot];
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
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
