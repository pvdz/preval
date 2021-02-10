# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_delete_computed_c-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = { y: 1 };

    let a = delete ($(1), $(2), $(x))[$("y")];
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
    $(1);
    $(2);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true, {}
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
