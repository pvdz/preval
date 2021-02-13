# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > assignments > logic_and_both > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)[$("c")] = $(b)[$("d")]) && (a = $(b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
a = tmpNestedAssignPropRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  tmpCalleeParam = varInitAssignLhsComputedRhs;
}
$(tmpCalleeParam);
$(a, b);
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
 - 9: 20
 - 10: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
