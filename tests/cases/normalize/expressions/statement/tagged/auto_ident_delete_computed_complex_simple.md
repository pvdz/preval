# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > statement > tagged > auto_ident_delete_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${delete $(arg)["y"]} after`;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = 'y';
const tmpCalleeParam$1 = delete tmpDeleteCompObj[tmpDeleteCompProp];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpDeleteCompObj = $(arg);
const tmpCalleeParam$1 = delete tmpDeleteCompObj['y'];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: ['before ', ' after'], true
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
