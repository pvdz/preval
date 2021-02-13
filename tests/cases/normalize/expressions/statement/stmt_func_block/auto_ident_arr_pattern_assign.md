# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > statement > stmt_func_block > auto_ident_arr_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1,
      y = 2;

    let a = { a: 999, b: 1000 };
    [x, y] = [$(3), $(4)];
    $(a, x, y);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let x = 1;
    let y = 2;
    let a = { a: 999, b: 1000 };
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    $(a, x, y);
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
    let x = 1;
    let y = 2;
    let a = { a: 999, b: 1000 };
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    $(a, x, y);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same