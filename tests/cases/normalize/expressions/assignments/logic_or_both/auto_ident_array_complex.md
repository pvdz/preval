# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > logic_or_both > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) || (a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpArrElement$3 = $(1);
  const tmpArrElement$4 = 2;
  const tmpArrElement$5 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$3, tmpArrElement$4, tmpArrElement$5];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
a = [tmpArrElement, 2, tmpArrElement$2];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpArrElement$3 = $(1);
  const tmpArrElement$5 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$3, 2, tmpArrElement$5];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
