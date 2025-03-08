# Preval test case

# default_yes_yes_no__obj_obj_null.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Settled


`````js filename=intro
y = null;
$(null);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
y = null;
$(null);
`````

## Pre Normal


`````js filename=intro
({ x: { y: y = $(`fail`) } = $({ y: `fail2` }) } = { x: { x: 1, y: null, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { x: 1, y: null, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { y: `fail2` };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
y = null;
$( null );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
