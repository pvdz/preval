# Preval test case

# default_no_no__undefined.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = undefined;
$(x);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = undefined;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = $tdz$__pattern_after_default;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
const x = objPatternRest(undefined, tmpCalleeParam$1, 'x');
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
