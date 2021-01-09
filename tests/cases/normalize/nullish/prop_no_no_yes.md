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
var tmpComplexMemberObj;
var tmpTernaryTest;
const a = {};
tmpComplexMemberObj = a.b;
tmpNullish = tmpComplexMemberObj.c;
tmpTernaryTest = tmpNullish == null;
tmpArg = tmpTernaryTest ? d : tmpNullish;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpComplexMemberObj;
var tmpTernaryTest;
const a = {};
tmpComplexMemberObj = a.b;
tmpNullish = tmpComplexMemberObj.c;
tmpTernaryTest = tmpNullish == null;
tmpArg = tmpTernaryTest ? d : tmpNullish;
$(tmpArg);
`````
