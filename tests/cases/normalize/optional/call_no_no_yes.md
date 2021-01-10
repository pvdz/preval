# Preval test case

# call_no_no_yes.md

> normalize > optional > call_no_no_yes
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
const a = {};
$(a().b().c?.().d);
`````

 ## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
const a = {};
tmpComplexMemberObj_1 = a();
tmpComplexMemberObj = tmpComplexMemberObj_1.b();
tmpOptionalChaining_1 = tmpComplexMemberObj.c;
tmpTernaryTest = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining_1()), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining.d), tmpTernaryAlternate_1);
$(tmpArg);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
const a = {};
tmpComplexMemberObj_1 = a();
tmpComplexMemberObj = tmpComplexMemberObj_1.b();
tmpOptionalChaining_1 = tmpComplexMemberObj.c;
tmpTernaryTest = tmpOptionalChaining_1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_1;
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
var x;
var x;
var x;
var x = {};
x = x();
x = x.x();
x = x.x;
x = x * x;
if (x) {
  x = x;
} else {
  x = x();
  x = x;
}
x = x * x;
if (x) {
  x = x;
} else {
  x = x.x;
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
const a = {};
tmpComplexMemberObj_1 = a();
tmpComplexMemberObj = tmpComplexMemberObj_1.b();
tmpOptionalChaining_1 = tmpComplexMemberObj.c;
tmpTernaryTest = tmpOptionalChaining_1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining == null;
if (tmpTernaryTest_1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_1;
}
$(tmpArg);
`````
