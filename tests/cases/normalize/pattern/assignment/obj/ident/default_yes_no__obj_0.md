# Preval test case

# default_yes_no__obj_0.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('fail') } = { x: 0 });
$(x);
`````

## Pre Normal

`````js filename=intro
({ x: x = $(`fail`) } = { x: 0 });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 0 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
x = 0;
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
