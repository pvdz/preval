# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  obj.a.b.c;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  const tmpBindingInit = obj.a;
  const tmpCompObj = tmpBindingInit.b;
  tmpCompObj.c;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpObjPropValue$2;
  tmpObjPropValue$2 = $();
  tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  const tmpBindingInit = obj.a;
  const tmpCompObj = tmpBindingInit.b;
  tmpCompObj.c;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
