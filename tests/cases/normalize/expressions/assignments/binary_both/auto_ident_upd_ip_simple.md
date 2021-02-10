# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_upd_ip_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b++) + (a = b++));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpPostUpdArgIdent$1 = b;
b = b + 1;
const tmpNestedComplexRhs$1 = tmpPostUpdArgIdent$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
