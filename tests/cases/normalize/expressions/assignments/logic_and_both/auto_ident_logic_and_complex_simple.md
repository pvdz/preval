# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && 2) && (a = $($(1)) && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  let tmpNestedComplexRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpNestedComplexRhs$1) {
    tmpNestedComplexRhs$1 = 2;
  }
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
