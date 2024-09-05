# Preval test case

# regression.md

> Normalize > Expressions > Regression
>
> This case was being transformed incorrectly, with a sequence ending up as the lhs of an assignment (which is invalid).

## Input

`````js filename=intro
var x = {}, a = 1, b = 2, c = 3;
x[a + b] = c;
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let x = undefined;
(x = {}), (a = 1), (b = 2), (c = 3);
x[a + b] = c;
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let x = undefined;
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

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
