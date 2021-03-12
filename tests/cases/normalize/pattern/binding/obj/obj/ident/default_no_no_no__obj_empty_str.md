# Preval test case

# default_no_no_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default no no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y } } = { x: '', b: 11, c: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const {
  x: { y },
} = { x: '', b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: '', b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: '', b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const y = objPatternNoDefault.y;
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
