# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Binary both > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + (a = $(1) + $(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) + (a = $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
let tmpBinBothLhs = a;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
a = tmpBinBothLhs$2 + tmpBinBothRhs$2;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const SSA_a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs$2 = $(1);
const tmpBinBothRhs$2 = $(2);
const SSA_a$1 = tmpBinBothLhs$2 + tmpBinBothRhs$2;
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 6
 - 6: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
