# Preval test case

# auto_ident_computed_simple_simple.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = b["c"];
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { c: 1 };
    let a = b.c;
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
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
