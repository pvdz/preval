# Preval test case

# auto_ident_bin.md

> normalize > expressions > bindings > export > auto_ident_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $(1) + $(2);
$(a);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let a = tmpBinBothLhs + tmpBinBothRhs;
export { a };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
