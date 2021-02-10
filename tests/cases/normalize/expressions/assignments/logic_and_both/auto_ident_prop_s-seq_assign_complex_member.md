# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > assignments > logic_and_both > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c = $(b)[$("d")]) && (a = (1, 2, b).c = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpNestedAssignObj$1 = b;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  let tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
  tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
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
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 20
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
