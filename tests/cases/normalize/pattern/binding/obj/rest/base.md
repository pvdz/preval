# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Pre Normal


`````js filename=intro
const { ...x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$3 = `x`;
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
$(x);
`````

## Output


`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 = [];
const x = objPatternRest(bindingPatternObjRoot, tmpCalleeParam$1, `x`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
x: 1,
b: 2,
c: 3
;
const b = [];
const c = objPatternRest( a, b, "x" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
