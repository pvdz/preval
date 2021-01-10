# Preval test case

# prop_yes_yes_yes.md

> normalize > nullish > prop_yes_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish_1 = b;
} else {
  tmpNullish_1 = a;
}
tmpTernaryTest_1 = tmpNullish_1 == null;
if (tmpTernaryTest_1) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish_1;
}
tmpTernaryTest_2 = tmpNullish == null;
if (tmpTernaryTest_2) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
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
var x = {};
x = x;
x = x * x;
if (x) {
  x = x;
} else {
  x = x;
}
x = x * x;
if (x) {
  x = x;
} else {
  x = x;
}
x = x * x;
if (x) {
  x = x;
} else {
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish_1 = b;
} else {
  tmpNullish_1 = a;
}
tmpTernaryTest_1 = tmpNullish_1 == null;
if (tmpTernaryTest_1) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish_1;
}
tmpTernaryTest_2 = tmpNullish == null;
if (tmpTernaryTest_2) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
