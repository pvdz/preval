# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > stmt_func_block > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    delete arg[$("y")];
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
    let a = { a: 999, b: 1000 };
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    delete tmpDeleteCompObj[tmpDeleteCompProp];
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
    let a = { a: 999, b: 1000 };
    const tmpDeleteCompObj = arg;
    const tmpDeleteCompProp = $('y');
    delete tmpDeleteCompObj[tmpDeleteCompProp];
    $(a, arg);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'y'
 - 2: { a: '999', b: '1000' }, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same