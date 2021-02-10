# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > call_spread > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 1 && $($(1))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam = $(1);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam);
}
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
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
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
