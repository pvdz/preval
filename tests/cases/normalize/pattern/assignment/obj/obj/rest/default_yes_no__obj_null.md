# Preval test case

# default_yes_no__obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = { x: null, b: 11, c: 12 });
$('bad');
`````

## Pre Normal

`````js filename=intro
({ x: { ...y } = $({ a: `fail` }) } = { x: null, b: 11, c: 12 });
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: null, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
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
y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(`bad`);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = [];
y = objPatternRest(null, tmpCalleeParam$3, undefined);
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
y = objPatternRest( null, a, undefined );
$( "bad" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
