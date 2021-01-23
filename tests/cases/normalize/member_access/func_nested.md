# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj.a.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpArg;
  var tmpMemberComplexObj;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  {
    tmpMemberComplexObj = obj.a;
    tmpArg = tmpMemberComplexObj.b;
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
  var tmpMemberComplexObj;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpMemberComplexObj = obj.a;
  tmpArg = tmpMemberComplexObj.b;
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
