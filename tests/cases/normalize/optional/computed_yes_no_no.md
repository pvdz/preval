# Preval test case

# computed_yes_no_no.md

> normalize > optional > computed_yes_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b][c][d]);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest$2;
var tmpTernaryAlternate$2;
tmpObjPropValue$1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue$1 };
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
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest$2 = c == null;
  if (tmpTernaryTest$2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate$2 = c[d];
    tmpComputedProp = tmpTernaryAlternate$2;
  }
  tmpTernaryAlternate$1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate$1;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest$2;
var tmpTernaryAlternate$2;
tmpObjPropValue$1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue$1 };
const a = { b: tmpObjPropValue };
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest$2 = false;
  if (tmpTernaryTest$2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate$2 = 'c'.d;
    tmpComputedProp = tmpTernaryAlternate$2;
  }
  tmpTernaryAlternate$1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate$1;
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

