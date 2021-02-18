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
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpNestedComplexRhs = $(60);
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(100);
    tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = $(60);
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
  const SSA_tmpNestedComplexRhs = $(60);
  SSA_a = SSA_tmpNestedComplexRhs;
  tmpCalleeParam = SSA_tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
