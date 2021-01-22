# Preval test case

# call_no_no_yes.md

> normalize > optional > call_no_no_yes
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
$(a().b().c?.().d);
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
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpMemberComplexObj_1 = a();
tmpMemberComplexObj = tmpMemberComplexObj_1.b();
tmpOptionalChaining_1 = tmpMemberComplexObj.c;
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
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpMemberComplexObj_1 = a();
tmpMemberComplexObj = tmpMemberComplexObj_1.b();
tmpOptionalChaining_1 = tmpMemberComplexObj.c;
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

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
