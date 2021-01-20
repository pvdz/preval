# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = undefined;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'fail' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const y = objPatternRest(objPatternAfterDefault, []);
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = undefined.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { a: 'fail' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
objPatternRest(objPatternAfterDefault, []);
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
