# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > tagged > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = --b)} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
$(tmpCalleeParam, 0);
$(0, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 0
 - 2: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
