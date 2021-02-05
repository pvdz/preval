# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > binary_both > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) + (a = b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
b = 2;
tmpNestedComplexRhs$1 = 2;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
b = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
b = 2;
tmpNestedComplexRhs$1 = 2;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, 2);
`````

## Result

Should call `$` with:
 - 1: 4
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
