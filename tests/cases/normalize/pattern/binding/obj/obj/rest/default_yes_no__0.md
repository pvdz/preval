# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = 0;
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = 0;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'pass' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const y = objPatternRest(objPatternAfterDefault, [], undefined);
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = (0).x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { a: 'pass' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const y = objPatternRest(objPatternAfterDefault, [], undefined);
$(y);
`````

## Result

Should call `$` with:
 - 0: {"a":"pass"}
 - 1: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
