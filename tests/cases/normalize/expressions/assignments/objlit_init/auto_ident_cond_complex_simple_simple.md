# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > assignments > objlit_init > auto_ident_cond_complex_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) ? 2 : $($(100))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpNestedComplexRhs = 2;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjLitVal;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpNestedComplexRhs = 2;
} else {
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = $(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '2' }
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
