# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a['b'];
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  const tmpCompObj = obj.a;
  tmpCompObj.b;
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
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  const tmpCompObj = obj.a;
  tmpCompObj.b;
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
