# Preval test case

# default_no_no__null.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = null;
$('bad');
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = null;
const objPatternNoDefault = $tdz$__pattern_after_default.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
null.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
