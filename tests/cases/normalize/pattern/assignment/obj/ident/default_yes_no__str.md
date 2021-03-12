# Preval test case

# default_yes_no__str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = 'abc');
$(x);
`````

## Pre Normal

`````js filename=intro
({ x = $('pass') } = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 'abc';
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
const objPatternBeforeDefault = 'abc'.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
