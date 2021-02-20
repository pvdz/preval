# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b))[$("c")]) + (a = (1, 2, $(b))[$("c")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothLhs = a;
const tmpAssignRhsCompObj$1 = $(b);
const tmpAssignRhsCompProp$1 = $('c');
a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
const SSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
const tmpAssignRhsCompObj$1 = $(b);
const tmpAssignRhsCompProp$1 = $('c');
const SSA_a$1 = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: { c: '1' }
 - 4: 'c'
 - 5: 2
 - 6: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
