# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Arr > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = { x: [1, 2, 3], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const $tdz$__pattern_after_default = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = [1, 2, 3];
const $tdz$__pattern_after_default = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
