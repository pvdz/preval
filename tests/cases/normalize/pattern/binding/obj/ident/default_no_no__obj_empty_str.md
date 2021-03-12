# Preval test case

# default_no_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: '' };
$(x);
`````

## Pre Normal

`````js filename=intro
const { x } = { x: '' };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: '' };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: '' };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
