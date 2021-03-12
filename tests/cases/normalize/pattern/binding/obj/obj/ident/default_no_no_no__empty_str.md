# Preval test case

# default_no_no_no__empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y } } = '';
$('bad');
`````

## Pre Normal

`````js filename=intro
const {
  x: { y },
} = '';
$('bad');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '';
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$('bad');
`````

## Output

`````js filename=intro
const objPatternNoDefault = ''.x;
objPatternNoDefault.y;
$('bad');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
