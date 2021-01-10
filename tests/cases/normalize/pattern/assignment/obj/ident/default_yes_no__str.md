# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > ident > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('pass') } = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
}
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = 'str';
x = x.x;
{
  var x = x * x;
  if (x) {
    x = x('str');
  } else {
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var x;
objAssignPatternRhs = 'abc';
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
