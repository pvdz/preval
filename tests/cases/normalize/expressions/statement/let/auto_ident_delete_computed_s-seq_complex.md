# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > statement > let > auto_ident_delete_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = delete ($(1), $(2), x)[$("y")];
$(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = x;
const tmpDeleteCompProp = $('y');
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
