# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> normalize > expressions > assignments > label > auto_ident_computed_c-seq_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
label: a = (1, 2, $(b))[$("c")] = $(b)[$("d")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
  a = tmpNestedAssignPropRhs;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
