# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > assignments > objlit_spread > auto_ident_logic_or_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($(0)) || $($(1)) || $($(2))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpread;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = $(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$2 = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam$2);
}
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$3);
}
a = tmpNestedComplexRhs;
tmpObjSpread = tmpNestedComplexRhs;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: {}
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
