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
var tmpArg;
var tmpNullish;
var tmpNullish$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
tmpObjPropValue$2 = $();
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpNullish$1 = a;
} else {
  tmpNullish$1 = obj;
}
tmpTernaryTest$1 = tmpNullish$1 == null;
if (tmpTernaryTest$1) {
  tmpNullish = b;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$2 = tmpNullish == null;
if (tmpTernaryTest$2) {
  tmpArg = c;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
tmpObjPropValue$2 = $();
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
obj = obj;
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpNullish$1 = a;
} else {
  tmpNullish$1 = obj;
}
tmpTernaryTest$1 = tmpNullish$1 == null;
if (tmpTernaryTest$1) {
  tmpNullish = b;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$2 = tmpNullish == null;
if (tmpTernaryTest$2) {
  tmpArg = c;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: {"a":{"b":{}}}
 - 2: undefined

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

