# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
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
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCompObj = obj.a;
  tmpCompObj.b;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
