# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > compound > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
