# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_object_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { x: $(1), y: 2, z: $(3) };
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$2 = $(3);
    a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$2 = $(3);
    a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same