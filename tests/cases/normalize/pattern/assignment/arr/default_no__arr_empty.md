# Preval test case

# default_no__arr_empty.md

> Normalize > Pattern > Assignment > Arr > Default no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = 1); // Expecting to crash
$('bad');
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 1;
const arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````

## Output

`````js filename=intro
[...1];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
