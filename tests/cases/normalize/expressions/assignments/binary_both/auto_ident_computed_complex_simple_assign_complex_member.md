# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Binary both > Auto ident computed complex simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"] = $(b)[$("d")]) + (a = $(b)["c"] = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpBinBothLhs = a;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
tmpNestedAssignObj$1.c = tmpNestedAssignPropRhs$1;
const tmpCalleeParam = tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignPropRhs$1, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: { c: '20', d: '20' }
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 40
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
