# Preval test case

# ident_simple.md

> normalize > assignment > computed-prop > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = 1;
let b = 2;
let c = 3;
let obj = {};
tmpAssignComMemLhsObj = obj;
a = b;
tmpAssignComMemLhsProp = b;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = 1;
let obj = {};
tmpAssignComMemLhsObj = obj;
a = 2;
tmpAssignComMemLhsProp = 2;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2,2,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
