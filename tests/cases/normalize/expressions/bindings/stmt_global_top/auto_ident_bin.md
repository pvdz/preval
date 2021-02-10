# Preval test case

# auto_ident_bin.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = $(1) + $(2);
$(a);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let a = tmpBinBothLhs + tmpBinBothRhs;
$(a);
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
