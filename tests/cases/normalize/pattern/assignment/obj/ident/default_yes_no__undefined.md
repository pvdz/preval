# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x = $('fail') } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
objAssignPatternRhs = undefined;
objPatternBeforeDefault = objAssignPatternRhs.x;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
objAssignPatternRhs = undefined;
objPatternBeforeDefault = objAssignPatternRhs.x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('fail');
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````
