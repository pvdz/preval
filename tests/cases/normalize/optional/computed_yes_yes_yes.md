# Preval test case

# computed_yes_yes_yes.md

> normalize > optional > computed_yes_yes_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a?.[b]?.[c]?.[d]);
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
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate = a[b];
  tmpOptionalChaining$1 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1[c];
  tmpOptionalChaining = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining == null;
if (tmpTernaryTest$2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining[d];
  tmpArg = tmpTernaryAlternate$2;
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
var tmpTernaryTest$2;
var tmpTernaryAlternate$2;
tmpObjPropValue$1 = { d: 10 };
tmpObjPropValue = { c: tmpObjPropValue$1 };
const a = { b: tmpObjPropValue };
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining$1 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1.c;
  tmpOptionalChaining = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining == null;
if (tmpTernaryTest$2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$2;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
