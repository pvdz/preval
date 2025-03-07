# Preval test case

# default_yes_no_no__obj_obj_empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } } = { x: { x: 1, y: '', z: 3 }, b: 11, c: 12 });
$(y);
`````

## Settled


`````js filename=intro
y = ``;
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
y = ``;
$(y);
`````

## Pre Normal


`````js filename=intro
({
  x: { y: y = $(`fail`) },
} = { x: { x: 1, y: ``, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { x: 1, y: ``, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
y = "";
$( y );
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
