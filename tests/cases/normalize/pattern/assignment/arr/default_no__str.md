# Preval test case

# default_no__str.md

> normalize > pattern >  > param > arr > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = 'xyz');
$('ok');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 'xyz';
const arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = 'xyz';
const arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
