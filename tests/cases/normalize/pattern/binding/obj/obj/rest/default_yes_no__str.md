# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = 'abc';
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = 'abc';
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
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
}
const y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x = 'str';
var x = x.x;
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = { x: 'str' };
      x = x(x);
    } else {
      x = x;
    }
  }
}
var x = x(x, []);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = 'abc'.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { a: 'pass' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````
