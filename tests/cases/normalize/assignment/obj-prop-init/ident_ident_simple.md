# Preval test case

# ident_ident_simple.md

> normalize > assignment > obj-prop-init > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$({foo: a = b = c});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
b = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[{ foo: 3 }], [3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
