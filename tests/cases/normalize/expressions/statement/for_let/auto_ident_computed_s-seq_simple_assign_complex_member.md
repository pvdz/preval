# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > statement > for_let > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let xyz = ((1, 2, b)[$("c")] = $(b)[$("d")]); ; $(1)) $(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let xyz;
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  xyz = tmpNestedPropAssignRhs;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let xyz;
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  xyz = tmpNestedPropAssignRhs;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 1
 - 6: 20
 - 7: 1
 - 8: 20
 - 9: 1
 - 10: 20
 - 11: 1
 - 12: 20
 - 13: 1
 - 14: 20
 - 15: 1
 - 16: 20
 - 17: 1
 - 18: 20
 - 19: 1
 - 20: 20
 - 21: 1
 - 22: 20
 - 23: 1
 - 24: 20
 - 25: 1
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
