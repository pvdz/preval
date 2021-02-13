# Preval test case

# auto_prop_complex_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_prop_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    $(a).b = $(2);
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
    a = { b: tmpObjLitVal };
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = $(2);
    tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
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
    a = { b: tmpObjLitVal };
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = $(2);
    tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 2
 - 4: { b: '2' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same