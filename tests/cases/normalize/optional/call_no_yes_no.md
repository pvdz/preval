# Preval test case

# call_no_yes_no.md

> normalize > optional > call_no_yes_no
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
$(a().b?.().c().d);
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
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpOptionalChaining$2;
var tmpOptionalChaining$3;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryAlternate$2;
var tmpTernaryAlternate$3;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
var tmpTernaryTest$3;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpOptionalChaining$2` decl without init>');
('<hoisted var `tmpOptionalChaining$3` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryAlternate$2` decl without init>');
('<hoisted var `tmpTernaryAlternate$3` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
('<hoisted var `tmpTernaryTest$2` decl without init>');
('<hoisted var `tmpTernaryTest$3` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpOptionalChaining$2` decl without init>');
('<hoisted var `tmpOptionalChaining$3` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryAlternate$2` decl without init>');
('<hoisted var `tmpTernaryAlternate$3` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
('<hoisted var `tmpTernaryTest$2` decl without init>');
('<hoisted var `tmpTernaryTest$3` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpOptionalChaining` decl without init>');
('<hoisted var `tmpOptionalChaining$1` decl without init>');
('<hoisted var `tmpOptionalChaining$2` decl without init>');
('<hoisted var `tmpOptionalChaining$3` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryAlternate$1` decl without init>');
('<hoisted var `tmpTernaryAlternate$2` decl without init>');
('<hoisted var `tmpTernaryAlternate$3` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpTernaryTest$1` decl without init>');
('<hoisted var `tmpTernaryTest$2` decl without init>');
('<hoisted var `tmpTernaryTest$3` decl without init>');
tmpMemberComplexObj = a();
tmpOptionalChaining$3 = tmpMemberComplexObj.b;
tmpTernaryTest = tmpOptionalChaining$3 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$2 = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$3();
  tmpOptionalChaining$2 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$2 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$2.c;
  tmpOptionalChaining$1 = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$2) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate$2;
}
tmpTernaryTest$3 = tmpOptionalChaining == null;
if (tmpTernaryTest$3) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$3 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$3;
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
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpOptionalChaining$2;
var tmpOptionalChaining$3;
var tmpTernaryAlternate;
var tmpTernaryAlternate$1;
var tmpTernaryAlternate$2;
var tmpTernaryAlternate$3;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
var tmpTernaryTest$3;
tmpMemberComplexObj = a();
tmpOptionalChaining$3 = tmpMemberComplexObj.b;
tmpTernaryTest = tmpOptionalChaining$3 == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$2 = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining$3();
  tmpOptionalChaining$2 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$2 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$2.c;
  tmpOptionalChaining$1 = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$2) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining$1();
  tmpOptionalChaining = tmpTernaryAlternate$2;
}
tmpTernaryTest$3 = tmpOptionalChaining == null;
if (tmpTernaryTest$3) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$3 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$3;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
