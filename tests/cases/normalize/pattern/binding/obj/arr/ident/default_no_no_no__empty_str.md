# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = '';
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = '';
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = ''.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
