# Preval test case

# base.md

> normalize > pattern >  > param > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = [1, 2, 3]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
