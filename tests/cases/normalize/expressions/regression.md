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
var a;
var b;
var c;
var x;
x = {};
a = 1;
b = 2;
c = 3;
const tmpAssignComMemLhsObj = x;
const tmpAssignComMemLhsProp = a + b;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = c;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
