# Preval test case

# default_yes_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternBeforeDefault;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternBeforeDefault = objPatternNoDefault.y;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$('bad');
`````
