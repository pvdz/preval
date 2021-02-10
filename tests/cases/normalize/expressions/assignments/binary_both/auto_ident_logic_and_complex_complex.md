# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_logic_and_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) + (a = $($(1)) && $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = $(1);
let tmpNestedComplexRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
if (tmpNestedComplexRhs$1) {
  const tmpCallCallee$4 = $;
  const tmpCalleeParam$4 = $(2);
  tmpNestedComplexRhs$1 = tmpCallCallee$4(tmpCalleeParam$4);
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
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: 4
 - 10: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
