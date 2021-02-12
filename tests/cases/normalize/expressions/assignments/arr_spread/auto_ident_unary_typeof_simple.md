# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > assignments > arr_spread > auto_ident_unary_typeof_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$([...(a = typeof x)]);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpArrSpread;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpArrSpread = tmpNestedComplexRhs;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpArrSpread;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpArrSpread = tmpNestedComplexRhs;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: ['n', 'u', 'm', 'b', 'e', 'r']
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
