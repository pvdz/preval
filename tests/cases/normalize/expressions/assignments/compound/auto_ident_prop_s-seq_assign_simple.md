# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > compound > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, b).c = 2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpBinBothRhs = tmpNestedPropAssignRhs;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpBinBothRhs = 2;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
