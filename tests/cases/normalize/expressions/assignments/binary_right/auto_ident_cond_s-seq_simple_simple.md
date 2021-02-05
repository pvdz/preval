# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > assignments > binary_right > auto_ident_cond_s-seq_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = (10, 20, 30) ? $(2) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
let tmpNestedComplexRhs = undefined;
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpNestedComplexRhs = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = $(2);
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 102
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
