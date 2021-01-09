# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj??a??b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
tmpNullish = tmpTernaryTest ? a : obj;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? b : tmpNullish;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = x();
x = { x: x };
var x = { x: x };
x = x;
x = x * x;
x = x ? x : x;
x = x * x;
x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
tmpNullish = tmpTernaryTest ? a : obj;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? b : tmpNullish;
$(tmpArg);
`````
