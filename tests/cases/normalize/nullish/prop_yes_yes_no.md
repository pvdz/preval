# Preval test case

# prop_yes_yes_no.md

> normalize > nullish > prop_yes_yes_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish = b;
} else {
  tmpNullish = a;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent = c.d;
  tmpArg = tmpTernaryConsequent;
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
  x = x.x;
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
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish = b;
} else {
  tmpNullish = a;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpTernaryConsequent = c.d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
