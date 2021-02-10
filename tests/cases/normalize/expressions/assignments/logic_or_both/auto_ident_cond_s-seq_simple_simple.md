# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_cond_s-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = (10, 20, 30) ? $(2) : $($(100))) || (a = (10, 20, 30) ? $(2) : $($(100)))
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpNestedComplexRhs = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs$1 = undefined;
  const tmpIfTest$1 = 30;
  if (tmpIfTest$1) {
    tmpNestedComplexRhs$1 = $(2);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
