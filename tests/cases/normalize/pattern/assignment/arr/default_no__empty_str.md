# Preval test case

# default_no__empty_str.md

> normalize > pattern >  > param > arr > default_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = '');
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
