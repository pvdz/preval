# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Assignment > Arr > Ident > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = undefined);
$('bad');
`````

## Pre Normal

`````js filename=intro
[x] = undefined;
$(`bad`);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = undefined;
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(`bad`);
`````

## Output

`````js filename=intro
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
