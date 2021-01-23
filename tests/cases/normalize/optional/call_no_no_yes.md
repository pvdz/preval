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
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
tmpMemberComplexObj$1 = a();
tmpMemberComplexObj = tmpMemberComplexObj$1.b();
tmpOptionalChaining$1 = tmpMemberComplexObj.c;
tmpTernaryTest = tmpOptionalChaining$1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$1;
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
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
tmpMemberComplexObj$1 = a();
tmpMemberComplexObj = tmpMemberComplexObj$1.b();
tmpOptionalChaining$1 = tmpMemberComplexObj.c;
tmpTernaryTest = tmpOptionalChaining$1 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining == null;
if (tmpTernaryTest$1) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$1;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
