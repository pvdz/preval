# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest$1;
  var tmpTernaryAlternate$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  {
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpOptionalChaining = undefined;
    } else {
      tmpTernaryAlternate = obj.a;
      tmpOptionalChaining = tmpTernaryAlternate;
    }
    tmpTernaryTest$1 = tmpOptionalChaining == null;
    if (tmpTernaryTest$1) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate$1 = tmpOptionalChaining.b;
      tmpArg = tmpTernaryAlternate$1;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest$1;
  var tmpTernaryAlternate$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpOptionalChaining = undefined;
  } else {
    tmpTernaryAlternate = obj.a;
    tmpOptionalChaining = tmpTernaryAlternate;
  }
  tmpTernaryTest$1 = tmpOptionalChaining == null;
  if (tmpTernaryTest$1) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate$1 = tmpOptionalChaining.b;
    tmpArg = tmpTernaryAlternate$1;
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
