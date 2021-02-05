# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > binary_left > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), x).y) + $(100));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
$(1);
$(2);
const tmpDeleteObj = x;
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
$(1);
$(2);
const tmpDeleteObj = x;
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 101
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
