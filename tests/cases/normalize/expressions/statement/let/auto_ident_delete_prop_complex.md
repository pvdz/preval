# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > let > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = delete $(x).y;
$(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(x);
let xyz = delete tmpDeleteObj.y;
$(xyz);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
