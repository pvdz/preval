# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> normalize > expressions > assignments > arr_element > auto_ident_computed_c-seq_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, $(b))[$("c")] = $(b)[$("d")]) +
    (a = (1, 2, $(b))[$("c")] = $(b)[$("d")])
);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $('c');
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
let tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
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
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: { c: '20', d: '20' }
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 40
 - 10: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
