# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100))) &&
    (a = (10, 20, 30) ? (40, 50, $(60)) : $($(100)))
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  40;
  50;
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1 = undefined;
  10;
  20;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    40;
    50;
    tmpNestedComplexRhs$1 = $(60);
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(100);
    tmpNestedComplexRhs$1 = tmpCallCallee$2(tmpCalleeParam$2);
  }
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = $(60);
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1 = undefined;
  tmpNestedComplexRhs$1 = $(60);
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
