# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_delete_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = { y: 1 };

    let a = delete $(x)[$("y")];
    $(a, x);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let x = { y: 1 };
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
    $(a, x);
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
    let x = { y: 1 };
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
    $(a, x);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true, {}
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
