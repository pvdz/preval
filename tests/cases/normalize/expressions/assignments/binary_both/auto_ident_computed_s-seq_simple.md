# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$("c")]) + (a = (1, 2, b)[$("c")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothLhs = a;
const tmpAssignRhsCompObj$1 = b;
const tmpAssignRhsCompProp$1 = $('c');
a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothLhs = a;
const tmpAssignRhsCompObj$1 = b;
const tmpAssignRhsCompProp$1 = $('c');
a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: 2
 - 4: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
