# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: 1, a: 2, b: 3 };
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 1, a: 2, b: 3 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
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
