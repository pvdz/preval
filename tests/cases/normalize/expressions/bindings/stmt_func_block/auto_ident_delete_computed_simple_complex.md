# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_delete_computed_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete arg[$("y")];
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
    $(a, arg);
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
    let arg = { y: 1 };
    const tmpDeleteCompProp = $('y');
    let a = delete arg[tmpDeleteCompProp];
    $(a, arg);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
