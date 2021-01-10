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
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = obj.a;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining.b;
  tmpArg = tmpTernaryAlternate_1;
}
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
var x;
var x;
x = x();
x = { x: x };
var x = { x: x };
x = x * x;
if (x) {
  x = x;
} else {
  x = x.x;
  x = x;
}
x = x * x;
if (x) {
  x = x;
} else {
  x = x.x;
  x = x;
}
x(x);
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
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = obj.a;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining.b;
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````
