# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_call_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = $(b)[$("$")](1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { $: $ };
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $('$');
    let a = tmpCallCompObj[tmpCallCompProp](1);
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
    let b = { $: $ };
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $('$');
    let a = tmpCallCompObj[tmpCallCompProp](1);
    $(a);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
