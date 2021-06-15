# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('fail') } = { x: 'abc' });
$(x);
`````

## Pre Normal

`````js filename=intro
({ x: x = $(`fail`) } = { x: `abc` });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: `abc` };
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
x = `abc`;
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
