# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > tagged > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof x)} after`;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
a = 'number';
tmpCalleeParam$1 = 'number';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 'number'
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
