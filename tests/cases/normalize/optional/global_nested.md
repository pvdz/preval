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
var tmpArg;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpOptionalChaining;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = obj.a;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining.b;
  tmpArg = tmpTernaryAlternate$1;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpOptionalChaining;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpObjPropValue$1 = $();
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = obj.a;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining.b;
  tmpArg = tmpTernaryAlternate$1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
