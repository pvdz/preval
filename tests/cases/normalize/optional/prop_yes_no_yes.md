# Preval test case

# prop_yes_no_yes.md

> normalize > optional > prop_yes_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.b.c?.d);
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
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
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

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
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
["<crash[ Cannot read property 'c' of undefined ]>"];

Normalized calls: BAD?!
[[null], null];

Final output calls: BAD!!
[[null], null];

