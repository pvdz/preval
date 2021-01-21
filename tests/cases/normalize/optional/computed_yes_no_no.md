# Preval test case

# computed_yes_no_no.md

> normalize > optional > computed_yes_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.[b][c][d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = a[b];
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest_2 = c == null;
  if (tmpTernaryTest_2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate_2 = c[d];
    tmpComputedProp = tmpTernaryAlternate_2;
  }
  tmpTernaryAlternate_1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = a[b];
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpComputedObj = tmpOptionalChaining;
  tmpTernaryTest_2 = c == null;
  if (tmpTernaryTest_2) {
    tmpComputedProp = undefined;
  } else {
    tmpTernaryAlternate_2 = c[d];
    tmpComputedProp = tmpTernaryAlternate_2;
  }
  tmpTernaryAlternate_1 = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: BAD?!
[[null], null];

Final output calls: BAD!!
[[null], null];

