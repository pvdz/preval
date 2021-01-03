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
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 'xyz';
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 'xyz';
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````