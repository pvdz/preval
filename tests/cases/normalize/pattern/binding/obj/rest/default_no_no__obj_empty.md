# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Rest > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = {};
$(x);
`````

## Pre Normal

`````js filename=intro
const { ...x } = {};
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = {};
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = {};
const tmpCalleeParam$1 = [];
const x = objPatternRest(bindingPatternObjRoot, tmpCalleeParam$1, 'x');
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
