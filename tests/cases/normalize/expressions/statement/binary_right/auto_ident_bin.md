# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Binary right > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($(1) + $(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + ($(1) + $(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
