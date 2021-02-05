# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > binary_right > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
$(1);
$(2);
const tmpNestedComplexRhs = $(x);
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
$(1);
$(2);
const tmpNestedComplexRhs = $(1);
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 101
 - 6: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
