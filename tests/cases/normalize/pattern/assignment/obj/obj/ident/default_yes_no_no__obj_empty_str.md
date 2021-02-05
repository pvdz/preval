# Preval test case

# default_yes_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: '', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: '', b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault;
}
tmpAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
const tmpAssignObjPatternRhs = { x: '', b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
