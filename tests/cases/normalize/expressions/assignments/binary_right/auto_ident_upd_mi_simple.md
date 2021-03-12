# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = --b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + 0;
$(tmpCalleeParam);
$(0, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
