# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > binary_right > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete ($(1), $(2), x).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
$(1);
$(2);
const tmpDeleteObj = x;
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
$(1);
$(2);
const tmpDeleteObj = x;
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 101
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
