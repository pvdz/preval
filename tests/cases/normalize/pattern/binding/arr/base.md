# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [] = [1, 2, 3];
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
[...bindingPatternArrRoot];
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
