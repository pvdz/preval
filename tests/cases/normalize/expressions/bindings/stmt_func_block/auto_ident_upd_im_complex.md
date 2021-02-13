# Preval test case

# auto_ident_upd_im_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_upd_im_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = $($(b)).x--;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { x: 1 };
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    let a = tmpPostUpdArgVal;
    $(a, b);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  {
    let b = { x: 1 };
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = $(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    let a = tmpPostUpdArgVal;
    $(a, b);
  }
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '0' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same