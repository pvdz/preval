# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_logic_and_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = ($($(1)) && $($(1))) || $($(2)))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
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
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
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
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { 1: '10' }
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
