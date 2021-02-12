# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > assignments > template > auto_ident_logic_and_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(1)) && $($(1)) && $($(2)))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 'before  2  after'
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
