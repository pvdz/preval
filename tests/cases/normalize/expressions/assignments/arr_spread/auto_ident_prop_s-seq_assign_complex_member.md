# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > assignments > arr_spread > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$([...(a = (1, 2, b).c = $(b)[$("d")])]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
a = tmpNestedAssignPropRhs;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
