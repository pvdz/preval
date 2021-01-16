# Preval test case

# prop_yes_no_yes.md

> normalize > nullish > prop_yes_no_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpTernaryConsequent = b.c;
  tmpNullish = tmpTernaryConsequent;
} else {
  tmpNullish = a;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpTernaryConsequent = b.c;
  tmpNullish = tmpTernaryConsequent;
} else {
  tmpNullish = a;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
