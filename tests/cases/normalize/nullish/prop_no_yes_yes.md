# Preval test case

# prop_no_yes_yes.md

> normalize > nullish > prop_no_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
const a = {};
tmpNullish_1 = a.b;
tmpTernaryTest = tmpNullish_1 == null;
if (tmpTernaryTest) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish_1;
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
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
const a = {};
tmpNullish_1 = a.b;
tmpTernaryTest = tmpNullish_1 == null;
if (tmpTernaryTest) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish_1;
}
tmpTernaryTest_1 = tmpNullish == null;
if (tmpTernaryTest_1) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
