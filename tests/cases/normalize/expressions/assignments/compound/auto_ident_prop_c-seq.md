# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > compound > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, $(b)).c));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
1;
2;
const tmpCompObj = $(b);
const tmpBinBothRhs = tmpCompObj.c;
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpCompObj = $(b);
const tmpBinBothRhs = tmpCompObj.c;
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: NaN
 - 3: NaN, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
