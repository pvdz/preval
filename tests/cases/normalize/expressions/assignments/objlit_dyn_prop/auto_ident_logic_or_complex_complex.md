# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > assignments > objlit_dyn_prop > auto_ident_logic_or_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = $($(0)) || $($(2)))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitPropKey;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
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
let tmpObjLitPropKey;
const tmpCalleeParam$1 = $(0);
let tmpNestedComplexRhs = $(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpNestedComplexRhs = $(tmpCalleeParam$2);
}
a = tmpNestedComplexRhs;
tmpObjLitPropKey = tmpNestedComplexRhs;
const tmpCalleeParam = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { 2: '10' }
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
