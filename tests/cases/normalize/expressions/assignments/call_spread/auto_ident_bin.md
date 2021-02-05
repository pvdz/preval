# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > call_spread > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
