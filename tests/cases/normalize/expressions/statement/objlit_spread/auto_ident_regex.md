# Preval test case

# auto_ident_regex.md

> normalize > expressions > statement > objlit_spread > auto_ident_regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ .../foo/ });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same