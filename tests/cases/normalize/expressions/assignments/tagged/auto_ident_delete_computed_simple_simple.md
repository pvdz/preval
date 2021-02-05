# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > assignments > tagged > auto_ident_delete_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = delete x["y"])} after`;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNestedComplexRhs = delete x['y'];
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNestedComplexRhs = delete x.y;
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], true
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
