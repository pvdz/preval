# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = null;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { a: 'fail' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const y = objPatternRest(objPatternAfterDefault, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = null.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { a: 'fail' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternRest(objPatternAfterDefault, [], undefined);
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
