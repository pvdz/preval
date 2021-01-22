# Preval test case

# computed_yes_yes_no.md

> normalize > optional > computed_yes_yes_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b]?.[c][d]);
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
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate = a[b];
  tmpOptionalChaining_1 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_1[c];
  tmpOptionalChaining = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining == null;
if (tmpTernaryTest_2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining[d];
  tmpArg = tmpTernaryAlternate_2;
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
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining_1 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_1.c;
  tmpOptionalChaining = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining == null;
if (tmpTernaryTest_2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_2;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
