# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  $(obj.a.b);
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
  obj.a.b = 15;
  const tmpCallCallee = $;
  const tmpBindingInit = obj.a;
  const tmpCalleeParam = tmpBindingInit.b;
  tmpCallCallee(tmpCalleeParam);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  obj.a.b = 15;
  const tmpCallCallee = $;
  const tmpBindingInit = obj.a;
  const tmpCalleeParam = tmpBindingInit.b;
  tmpCallCallee(tmpCalleeParam);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 15
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
