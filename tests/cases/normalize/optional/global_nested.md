# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj?.a?.b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpTernaryTest = obj == null;
tmpOptionalChaining = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.a), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining.b), tmpTernaryAlternate_1);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpTernaryTest = obj == null;
tmpOptionalChaining = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.a), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining.b), tmpTernaryAlternate_1);
$(tmpArg);
`````
