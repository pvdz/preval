# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > statement > tagged > auto_ident_object_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${{ x: 1, y: 2, z: 3 }} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same