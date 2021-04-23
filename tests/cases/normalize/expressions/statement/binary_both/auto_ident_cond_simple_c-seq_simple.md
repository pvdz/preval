# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? (40, 50, $(60)) : $($(100))) + (1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? (40, 50, $(60)) : $($(100))) + (1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
tmpBinBothLhs = $(60);
let tmpBinBothRhs = undefined;
tmpBinBothRhs = $(60);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(60);
const tmpBinBothRhs = $(60);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
