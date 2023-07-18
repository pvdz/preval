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

## Pre Normal

`````js filename=intro
const {
  x: { ...y },
} = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = undefined;
const y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(y);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = [];
const y = objPatternRest(0, tmpCalleeParam$1, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = objPatternRest( 0, a, undefined );
$( b );
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
