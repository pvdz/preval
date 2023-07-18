# Preval test case

# default_yes_no_no__obj_obj_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } } = { x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 });
$(y);
`````

## Pre Normal

`````js filename=intro
({
  x: { y: y = $(`fail`) },
} = { x: { x: 1, y: `abc`, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: `abc`, z: 3 };
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

## Output

`````js filename=intro
y = `abc`;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
y = "abc";
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
