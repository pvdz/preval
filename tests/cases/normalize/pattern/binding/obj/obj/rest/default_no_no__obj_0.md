# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(y);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const tmpCalleeParam$1 = [];
const y = objPatternRest(objPatternNoDefault, tmpCalleeParam$1, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
