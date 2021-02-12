# Preval test case

# auto_ident_tagged_trivial.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_tagged_trivial
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = $`foo`;
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = ['foo'];
let a = tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['foo'];
let a = $(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: ['foo']
 - 2: ['foo']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
