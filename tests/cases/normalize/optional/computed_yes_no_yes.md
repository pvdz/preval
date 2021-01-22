# Preval test case

# computed_yes_no_yes.md

> normalize > optional > computed_yes_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b][c]?.[d]);
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
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
const b = 'b';
const c = 'c';
const d = 'd';
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = a[b];
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest_2 = c == null;
  if (tmpTernaryTest_2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate_2 = c[d];
    tmpComputedProp = tmpTernaryAlternate_2;
  }
  tmpTernaryAlternate_1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate_1;
}
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
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest_2 = false;
  if (tmpTernaryTest_2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate_2 = 'c'.d;
    tmpComputedProp = tmpTernaryAlternate_2;
  }
  tmpTernaryAlternate_1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: BAD?!
[[null], null];

Final output calls: BAD!!
[[null], null];

