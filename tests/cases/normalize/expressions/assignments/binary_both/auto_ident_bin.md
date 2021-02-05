# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > binary_both > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + (a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
const tmpNestedComplexRhs$1 = tmpBinBothLhs$2 + tmpBinBothRhs$2;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
const tmpNestedComplexRhs$1 = tmpBinBothLhs$2 + tmpBinBothRhs$2;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 6
 - 6: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
