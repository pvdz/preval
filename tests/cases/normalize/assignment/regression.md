# Preval test case

# regression.md

> normalize > assignment > regression
>
> This case was being transformed incorrectly, with a sequence ending up as the lhs of an assignment (which is invalid).

#TODO

## Input

`````js filename=intro
var x = {}, a = 1, b = 2, c = 3;
x[a + b] = c;
`````

## Normalized

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
x = {};
a = 1;
b = 2;
c = 3;
{
  tmpAssignComputedObj = x;
  tmpAssignComputedProp = a + b;
  tmpAssignComputedRhs = c;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
`````

## Output

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignComputedObj = x;
tmpAssignComputedProp = a + b;
tmpAssignComputedRhs = c;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
