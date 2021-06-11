# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b))[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b))[$('c')]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
const tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpCalleeParam = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 101
 - 5: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
