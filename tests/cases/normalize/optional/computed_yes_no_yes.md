# Preval test case

# computed_yes_no_yes.md

> normalize > optional > computed_yes_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.[b][c]?.[d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a[b]), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_1
  ? undefined
  : ((tmpTernaryTest_2 = c == null),
    (tmpComputedProp = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = c[d]), tmpTernaryAlternate_2)),
    (tmpTernaryAlternate_1 = tmpOptionalChaining[tmpComputedProp]),
    tmpTernaryAlternate_1);
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
var x;
var x;
var x = {};
x = x * x;
x = x ? x : ((x = x[x]), x);
x = x * x;
x = x ? x : ((x = x * x), (x = x ? x : ((x = x[x]), x)), (x = x[x]), x);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpComputedProp;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a[b]), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_1
  ? undefined
  : ((tmpTernaryTest_2 = c == null),
    (tmpComputedProp = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = c[d]), tmpTernaryAlternate_2)),
    (tmpTernaryAlternate_1 = tmpOptionalChaining[tmpComputedProp]),
    tmpTernaryAlternate_1);
$(tmpArg);
`````
