# Preval test case

# auto_ident_template_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_template_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Normalized

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Output

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Result

Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same