# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > return > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return { x: $(1), y: 2, z: $(3) };
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$2 = $(3);
  const tmpReturnArg = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$2 = $(3);
  const tmpReturnArg = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
