# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_upd_i m_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = b--;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = 1;
    const tmpPostUpdArgIdent = b;
    b = b - 1;
    let a = tmpPostUpdArgIdent;
    $(a, b);
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
 - 1: 1, 0
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
