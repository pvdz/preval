# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > if > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
