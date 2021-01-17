# Preval test case

# prop_no_no_yes.md

> normalize > nullish > prop_no_no_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpMemberComplexObj;
var tmpTernaryTest;
const a = {};
tmpMemberComplexObj = a.b;
tmpNullish = tmpMemberComplexObj.c;
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
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
var tmpMemberComplexObj;
var tmpTernaryTest;
const a = {};
tmpMemberComplexObj = a.b;
tmpNullish = tmpMemberComplexObj.c;
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
