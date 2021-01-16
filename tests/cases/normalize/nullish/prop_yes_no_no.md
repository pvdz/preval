# Preval test case

# prop_yes_no_no.md

> normalize > nullish > prop_yes_no_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpComplexMemberObj;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpComplexMemberObj = b.c;
  tmpTernaryConsequent = tmpComplexMemberObj.d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = a;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpComplexMemberObj;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpComplexMemberObj = b.c;
  tmpTernaryConsequent = tmpComplexMemberObj.d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = a;
}
$(tmpArg);
`````
