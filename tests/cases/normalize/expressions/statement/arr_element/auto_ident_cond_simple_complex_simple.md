# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident cond simple complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? $(2) : $($(100))) + (1 ? $(2) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 ? $(2) : $($(100))) + (1 ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
tmpBinBothLhs = $(2);
let tmpBinBothRhs = undefined;
tmpBinBothRhs = $(2);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_tmpBinBothLhs = $(2);
const SSA_tmpBinBothRhs = $(2);
SSA_tmpBinBothLhs + SSA_tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
