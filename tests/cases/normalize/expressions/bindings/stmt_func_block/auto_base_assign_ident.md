# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > stmt_func_block > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = (b = $(2));
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
    let a;
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
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
 - 1: 2
 - 2: 2, 2
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
