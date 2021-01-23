# Preval test case

# computed_no_yes_no.md

> normalize > optional > computed_no_yes_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b]?.[c][d]);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
tmpObjPropValue$1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue$1 };
const a = { b: tmpObjPropValue };
const b = 'b';
const c = 'c';
const d = 'd';
tmpOptionalChaining$1 = a[b];
tmpTernaryTest = tmpOptionalChaining$1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$1[c];
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining[d];
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
var tmpOptionalChaining$1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
tmpObjPropValue$1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue$1 };
const a = { b: tmpObjPropValue };
tmpOptionalChaining$1 = a.b;
tmpTernaryTest = tmpOptionalChaining$1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$1.c;
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
