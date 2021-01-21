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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignComMemLhsObj = x;
tmpAssignComMemLhsProp = a + b;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = c;
`````

## Output

`````js filename=intro
var x;
var a;
var b;
var c;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
x = {};
a = 1;
b = 2;
c = 3;
tmpAssignComMemLhsObj = x;
tmpAssignComMemLhsProp = a + b;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = c;
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
