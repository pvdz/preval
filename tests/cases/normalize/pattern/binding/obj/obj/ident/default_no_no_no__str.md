# Preval test case

# default_no_no_no__str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y } } = 'abc';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 'abc';
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = 'abc'.x;
objPatternNoDefault.y;
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
