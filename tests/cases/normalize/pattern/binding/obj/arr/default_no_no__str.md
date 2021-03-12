# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Binding > Obj > Arr > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = 'abc';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 'abc';
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
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
