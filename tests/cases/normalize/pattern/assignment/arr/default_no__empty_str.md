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
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = 'str';
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````
