# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > tagged > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = ($($(1)) && $($(1))) || $($(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$2);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$3 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$3);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$4 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$4);
}
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCalleeParam$2 = $(1);
let tmpNestedComplexRhs = $(tmpCalleeParam$2);
if (tmpNestedComplexRhs) {
  const tmpCalleeParam$3 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$3);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$4 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$4);
}
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
