# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || 2) && (a = $($(0)) || 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCalleeParam$2 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$2);
  if (tmpNestedComplexRhs) {
  } else {
    tmpNestedComplexRhs = 2;
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 2
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same