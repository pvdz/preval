# Preval test case

# ident_ident_simple.md

> normalize > assignment > computed-prop > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
let obj = {};
obj[a = b = c] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let obj = {};
tmpAssignComMemLhsObj = obj;
b = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpAssignComMemLhsProp = tmpNestedComplexRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let obj = {};
tmpAssignComMemLhsObj = obj;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpAssignComMemLhsProp = tmpNestedComplexRhs;
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 1000;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3,3,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
