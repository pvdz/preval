# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > assignments > ternary_b > auto_ident_cond_simple_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = 1 ? (40, 50, $(60)) : $($(100))) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  if (1) {
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
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  tmpNestedComplexRhs = $(60);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
