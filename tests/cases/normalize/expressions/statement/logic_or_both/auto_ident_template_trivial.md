# Preval test case

# auto_ident_template_trivial.md

> normalize > expressions > statement > logic_or_both > auto_ident_template_trivial
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
let a = `foo`;
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same