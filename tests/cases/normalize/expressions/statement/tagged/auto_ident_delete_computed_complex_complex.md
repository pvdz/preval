# Preval test case

# auto_ident_delete_computed_complex_complex.md

> normalize > expressions > statement > tagged > auto_ident_delete_computed_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${delete $(x)[$("y")]} after`;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = $('y');
const tmpCalleeParam$1 = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: ['before ', ' after'], true
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
