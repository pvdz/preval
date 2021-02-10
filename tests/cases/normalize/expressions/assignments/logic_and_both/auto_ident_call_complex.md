# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > assignments > logic_and_both > auto_ident_call_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) && (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCallee$1 = $($);
const tmpNestedComplexRhs = tmpCallCallee$1(1);
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  const tmpCallCallee$2 = $($);
  const tmpNestedComplexRhs$1 = tmpCallCallee$2(1);
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
