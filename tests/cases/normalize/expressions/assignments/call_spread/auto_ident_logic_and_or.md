# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > call_spread > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$1 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$1);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$2 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$2);
}
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
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$1 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$1);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$2 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$2);
}
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
