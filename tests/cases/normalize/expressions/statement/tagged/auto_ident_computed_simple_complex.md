# Preval test case

# auto_ident_computed_simple_complex.md

> normalize > expressions > statement > tagged > auto_ident_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${b[$("c")]} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpCalleeParam$1 = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpCalleeParam$1 = tmpCompObj[tmpCompProp];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same