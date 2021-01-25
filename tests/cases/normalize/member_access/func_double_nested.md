# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj.a.b.c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpMemberComplexObj;
  var tmpMemberComplexObj$1;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpMemberComplexObj$1 = obj.a;
  tmpMemberComplexObj = tmpMemberComplexObj$1.b;
  tmpArg = tmpMemberComplexObj.c;
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpMemberComplexObj;
  var tmpMemberComplexObj$1;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpMemberComplexObj$1 = obj.a;
  tmpMemberComplexObj = tmpMemberComplexObj$1.b;
  tmpArg = tmpMemberComplexObj.c;
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
