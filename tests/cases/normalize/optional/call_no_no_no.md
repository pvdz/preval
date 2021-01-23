# Preval test case

# call_no_no_no.md

> normalize > optional > call_no_no_no
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
$(a().b().c().d);
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
var tmpMemberComplexObj$2;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpMemberComplexObj$2` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpMemberComplexObj$2` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpMemberComplexObj$2` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpMemberComplexObj` decl without init>');
('<hoisted var `tmpMemberComplexObj$1` decl without init>');
('<hoisted var `tmpMemberComplexObj$2` decl without init>');
tmpMemberComplexObj$2 = a();
tmpMemberComplexObj$1 = tmpMemberComplexObj$2.b();
tmpMemberComplexObj = tmpMemberComplexObj$1.c();
tmpArg = tmpMemberComplexObj.d;
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
var tmpMemberComplexObj$2;
tmpMemberComplexObj$2 = a();
tmpMemberComplexObj$1 = tmpMemberComplexObj$2.b();
tmpMemberComplexObj = tmpMemberComplexObj$1.c();
tmpArg = tmpMemberComplexObj.d;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
