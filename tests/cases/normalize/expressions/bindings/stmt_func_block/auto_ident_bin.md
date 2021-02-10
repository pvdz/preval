# Preval test case

# auto_ident_bin.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $(1) + $(2);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    let a = tmpBinBothLhs + tmpBinBothRhs;
    $(a);
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
 - 3: 3
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
