# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > obj-prop-dyn > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$({[(a = b.x = c)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedComplexRhs;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
tmpNestedPropAssignRhs = 3;
b.x = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"3":1000}
 - 1: 3,{"x":3},3
 - 2: undefined

Normalized calls: Same

Final output calls: Same