# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = 'abc';
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = 'abc';
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat.slice(0);
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
