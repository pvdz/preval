# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_logic_or_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || 2) + (a = 0 || 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs = 0;
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1 = 0;
if (tmpNestedComplexRhs$1) {
} else {
  tmpNestedComplexRhs$1 = 2;
}
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 4
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
