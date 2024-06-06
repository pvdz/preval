# Preval test case

# default_yes_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Pre Normal


`````js filename=intro
const { x: { ...y } = $({ a: `fail` }) } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: `fail` };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$5 = undefined;
const y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(y);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 = [];
const y = objPatternRest(0, tmpCalleeParam$3, undefined);
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
