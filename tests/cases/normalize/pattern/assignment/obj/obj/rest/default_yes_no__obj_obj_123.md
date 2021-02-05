# Preval test case

# default_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 'fail' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$2 = [];
const tmpCalleeParam$3 = undefined;
y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
tmpAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 'fail' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$2 = [];
y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, undefined);
$(y);
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
