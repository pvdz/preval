# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj?.a?.b);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpAssignMemLhsObj;
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
tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
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
var tmpAssignMemLhsObj;
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
tmpAssignMemLhsObj = obj.a;
tmpAssignMemLhsObj.b = 15;
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
 - 1: 15
 - 2: undefined

Normalized calls: Same

Final output calls: Same
