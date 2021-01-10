# Preval test case

# computed_no_yes_no.md

> normalize > optional > computed_no_yes_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a[b]?.[c][d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
const a = {};
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

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x = {};
x = x[x];
x = x * x;
if (x) {
  x = x;
} else {
  x = x[x];
  x = x;
}
x = x * x;
if (x) {
  x = x;
} else {
  x = x[x];
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
const a = {};
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
