# Preval test case

# default_no_no_no__obj_arr_elided.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default no no no  obj arr elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = [, , , 1];
const $tdz$__pattern_after_default = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = [, , , 1];
const $tdz$__pattern_after_default = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
