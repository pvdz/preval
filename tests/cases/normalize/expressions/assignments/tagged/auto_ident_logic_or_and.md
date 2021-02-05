# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > tagged > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(0)) || ($($(1)) && $($(2))))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$4);
  }
}
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$3);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$4 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$4);
  }
}
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: ['before ', ' after'], 2
 - 8: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
