# Preval test case

# default_no__arr_elided.md

> normalize > pattern >  > param > arr > default_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = [, , 1]);
$('ok');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = [, , 1];
const arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [, , 1];
[...arrAssignPatternRhs];
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
