# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > assignments > compound > auto_ident_logic_||_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= 0 || $($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
let tmpBinBothRhs = 0;
if (tmpBinBothRhs) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
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
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
