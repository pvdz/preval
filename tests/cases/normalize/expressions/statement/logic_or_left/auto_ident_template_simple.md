# Preval test case

# auto_ident_template_simple.md

> normalize > expressions > statement > logic_or_left > auto_ident_template_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

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

## Globals

None

## Result

Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
