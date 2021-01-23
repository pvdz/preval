# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj?.a?.b?.c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  var tmpOptionalChaining;
  var tmpOptionalChaining$1;
  var tmpTernaryAlternate;
  var tmpTernaryAlternate$1;
  var tmpTernaryAlternate$2;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  var tmpTernaryTest$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  {
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpOptionalChaining$1 = undefined;
    } else {
      tmpTernaryAlternate = obj.a;
      tmpOptionalChaining$1 = tmpTernaryAlternate;
    }
    tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
    if (tmpTernaryTest$1) {
      tmpOptionalChaining = undefined;
    } else {
      tmpTernaryAlternate$1 = tmpOptionalChaining$1.b;
      tmpOptionalChaining = tmpTernaryAlternate$1;
    }
    tmpTernaryTest$2 = tmpOptionalChaining == null;
    if (tmpTernaryTest$2) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate$2 = tmpOptionalChaining.c;
      tmpArg = tmpTernaryAlternate$2;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  var tmpOptionalChaining;
  var tmpOptionalChaining$1;
  var tmpTernaryAlternate;
  var tmpTernaryAlternate$1;
  var tmpTernaryAlternate$2;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  var tmpTernaryTest$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpOptionalChaining$1 = undefined;
  } else {
    tmpTernaryAlternate = obj.a;
    tmpOptionalChaining$1 = tmpTernaryAlternate;
  }
  tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
  if (tmpTernaryTest$1) {
    tmpOptionalChaining = undefined;
  } else {
    tmpTernaryAlternate$1 = tmpOptionalChaining$1.b;
    tmpOptionalChaining = tmpTernaryAlternate$1;
  }
  tmpTernaryTest$2 = tmpOptionalChaining == null;
  if (tmpTernaryTest$2) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate$2 = tmpOptionalChaining.c;
    tmpArg = tmpTernaryAlternate$2;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
