# Preval test case

# auto_ident_template_trivial.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_template_trivial
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `foo`;
$(a);
`````

## Normalized

`````js filename=intro
let a = `foo`;
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
