# Preval test case

# computed_no_yes_yes.md

> normalize > optional > computed_no_yes_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b]?.[c]?.[d]);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
const b = 'b';
const c = 'c';
const d = 'd';
tmpOptionalChaining_1 = a[b];
tmpTernaryTest = tmpOptionalChaining_1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_1[c];
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining[d];
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
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
tmpOptionalChaining_1 = a.b;
tmpTernaryTest = tmpOptionalChaining_1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_1.c;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
