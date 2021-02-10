# Preval test case

# default_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = { x: undefined });
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: undefined };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
