# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = undefined;
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$('bad');
`````

## Output

`````js filename=intro
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
