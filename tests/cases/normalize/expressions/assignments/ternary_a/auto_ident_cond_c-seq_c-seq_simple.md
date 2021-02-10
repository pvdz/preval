# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > ternary_a > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
let tmpNestedComplexRhs = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 100
 - 4: 100
 - 5: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
