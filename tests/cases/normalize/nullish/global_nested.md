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
if (tmpTernaryTest) {
  tmpNullish = a;
} else {
  tmpNullish = obj;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpArg = b;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
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
if (tmpTernaryTest) {
  tmpNullish = a;
} else {
  tmpNullish = obj;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpArg = b;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: {"a":{}}
 - 2: undefined

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

