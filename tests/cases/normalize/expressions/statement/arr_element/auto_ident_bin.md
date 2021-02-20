# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Arr element > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) + $(2) + ($(1) + $(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$2 + tmpBinBothRhs$2;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$2 + tmpBinBothRhs$2;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
