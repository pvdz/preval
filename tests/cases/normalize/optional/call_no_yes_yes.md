# Preval test case

# call_no_yes_yes.md

> normalize > optional > call_no_yes_yes
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
function a() {
  const a = {
    a(){ return a; },
    b(){ return a; },
    c(){ return a; },
    d(){ return a; }
  };

  return a;
}
$(a().b?.().c?.().d);
`````

## Normalized

`````js filename=intro
function a() {
  const a_1 = {
    a() {
      return a_1;
    },
    b() {
      return a_1;
    },
    c() {
      return a_1;
    },
    d() {
      return a_1;
    },
  };
  return a_1;
}
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
tmpMemberComplexObj = a();
tmpOptionalChaining_3 = tmpMemberComplexObj.b;
tmpTernaryTest = tmpOptionalChaining_3 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining_2 = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_3();
  tmpOptionalChaining_2 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_2 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_2.c;
  tmpOptionalChaining_1 = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_2) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate_2;
}
tmpTernaryTest_3 = tmpOptionalChaining == null;
if (tmpTernaryTest_3) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_3 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_3;
}
$(tmpArg);
`````

## Output

`````js filename=intro
function a() {
  const a_1 = {
    a() {
      return a_1;
    },
    b() {
      return a_1;
    },
    c() {
      return a_1;
    },
    d() {
      return a_1;
    },
  };
  return a_1;
}
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
tmpMemberComplexObj = a();
tmpOptionalChaining_3 = tmpMemberComplexObj.b;
tmpTernaryTest = tmpOptionalChaining_3 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining_2 = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining_3();
  tmpOptionalChaining_2 = tmpTernaryAlternate;
}
tmpTernaryTest_1 = tmpOptionalChaining_2 == null;
if (tmpTernaryTest_1) {
  tmpOptionalChaining_1 = undefined;
} else {
  tmpTernaryAlternate_1 = tmpOptionalChaining_2.c;
  tmpOptionalChaining_1 = tmpTernaryAlternate_1;
}
tmpTernaryTest_2 = tmpOptionalChaining_1 == null;
if (tmpTernaryTest_2) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate_2 = tmpOptionalChaining_1();
  tmpOptionalChaining = tmpTernaryAlternate_2;
}
tmpTernaryTest_3 = tmpOptionalChaining == null;
if (tmpTernaryTest_3) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate_3 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate_3;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
