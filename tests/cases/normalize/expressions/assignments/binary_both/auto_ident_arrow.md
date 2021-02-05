# Preval test case

# auto_ident_arrow.md

> normalize > expressions > assignments > binary_both > auto_ident_arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) + (a = () => {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpNestedComplexRhs = () => {};
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpNestedComplexRhs$1 = () => {};
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
const tmpNestedComplexRhs = () => {};
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpNestedComplexRhs$1 = () => {};
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '() => {}() => {}'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
