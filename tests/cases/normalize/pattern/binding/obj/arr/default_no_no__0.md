# Preval test case

# default_no_no__0.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = 0;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = 0;
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = (0).x;
[...objPatternNoDefault];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
