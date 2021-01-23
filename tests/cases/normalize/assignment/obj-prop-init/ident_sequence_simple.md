# Preval test case

# ident_sequence_simple.md

> normalize > assignment > obj-prop-init > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$({foo: a = ($(b), c)});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpObjPropValue;
let a = 1;
let b = 2;
let c = 3;
$(b);
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
var tmpNestedComplexRhs;
var tmpObjPropValue;
let a = 1;
$(2);
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpObjPropValue = tmpNestedComplexRhs;
tmpArg = { foo: tmpObjPropValue };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: {"foo":3}
 - 2: 3,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
