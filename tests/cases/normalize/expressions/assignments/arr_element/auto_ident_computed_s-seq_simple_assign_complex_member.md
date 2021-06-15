# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, b)[$("c")] = $(b)[$("d")]) +
    (a = (1, 2, b)[$("c")] = $(b)[$("d")])
);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)]) + (a = (1, 2, b)[$(`c`)] = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const tmpNestedAssignComMemberObj$1 = b;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
b[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
const tmpCalleeParam = tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignPropRhs$1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'c'
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 40
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
