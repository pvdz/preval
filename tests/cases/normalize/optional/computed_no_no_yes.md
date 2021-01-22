# Preval test case

# computed_no_no_yes.md

> normalize > optional > computed_no_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b][c]?.[d]);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpOptionalChaining;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
const b = 'b';
const c = 'c';
const d = 'd';
tmpMemberComplexObj = a[b];
tmpOptionalChaining = tmpMemberComplexObj[c];
tmpTernaryTest = tmpOptionalChaining == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining[d];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpArg;
var tmpOptionalChaining;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpObjPropValue_1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue_1 };
const a = { b: tmpObjPropValue };
tmpMemberComplexObj = a.b;
tmpOptionalChaining = tmpMemberComplexObj.c;
tmpTernaryTest = tmpOptionalChaining == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
