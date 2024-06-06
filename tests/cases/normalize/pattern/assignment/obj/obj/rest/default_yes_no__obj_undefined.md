# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Obj > Rest > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'pass' }) } = { x: undefined, b: 11, c: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({ x: { ...y } = $({ a: `pass` }) } = { x: undefined, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: `pass` };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$5 = undefined;
y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(y);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: `pass` };
const objPatternAfterDefault = $(tmpCalleeParam);
const tmpCalleeParam$3 = [];
y = objPatternRest(objPatternAfterDefault, tmpCalleeParam$3, undefined);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { a: "pass" };
const b = $( a );
const c = [];
y = objPatternRest( b, c, undefined );
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
