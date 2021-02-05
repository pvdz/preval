# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> normalize > expressions > statement > for_of_right > auto_ident_prop_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let x of ($(b).c = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpForOfDeclRhs = tmpNestedPropAssignRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpForOfDeclRhs = tmpNestedPropAssignRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
