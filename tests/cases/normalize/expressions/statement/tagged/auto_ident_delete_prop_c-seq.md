# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > tagged > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${delete ($(1), $(2), $(arg)).y} after`;
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpCalleeParam$1 = delete tmpDeleteObj.y;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpCalleeParam$1 = delete tmpDeleteObj.y;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: ['before ', ' after'], true
 - 5: { a: '999', b: '1000' }, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same