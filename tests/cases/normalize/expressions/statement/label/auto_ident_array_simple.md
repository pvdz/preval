# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > statement > label > auto_ident_array_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: [1, 2, 3];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
