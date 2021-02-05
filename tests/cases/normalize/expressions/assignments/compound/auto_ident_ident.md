# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > compound > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpNestedComplexRhs = tmpNestedCompoundLhs * b;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpNestedComplexRhs = tmpNestedCompoundLhs * 1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
