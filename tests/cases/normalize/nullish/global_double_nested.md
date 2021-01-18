# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj??a??b??c);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpNullish_1 = a;
} else {
  tmpNullish_1 = obj;
}
tmpTernaryTest_1 = tmpNullish_1 == null;
if (tmpTernaryTest_1) {
  tmpNullish = b;
} else {
  tmpNullish = tmpNullish_1;
}
tmpTernaryTest_2 = tmpNullish == null;
if (tmpTernaryTest_2) {
  tmpArg = c;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpNullish_1 = a;
} else {
  tmpNullish_1 = obj;
}
tmpTernaryTest_1 = tmpNullish_1 == null;
if (tmpTernaryTest_1) {
  tmpNullish = b;
} else {
  tmpNullish = tmpNullish_1;
}
tmpTernaryTest_2 = tmpNullish == null;
if (tmpTernaryTest_2) {
  tmpArg = c;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
[[], [{ a: { b: {} } }], null];

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

