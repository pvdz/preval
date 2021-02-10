# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > assignments > binary_right > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinBothRhs = tmpNestedComplexRhs;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 120
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
