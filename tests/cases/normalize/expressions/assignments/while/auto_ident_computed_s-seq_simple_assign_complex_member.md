# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > assignments > while > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, b)[$("c")] = $(b)[$("d")])) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
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
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
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
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: 'c'
 - 6: { c: '20', d: '20' }
 - 7: 'd'
 - 8: 100
 - 9: 'c'
 - 10: { c: '20', d: '20' }
 - 11: 'd'
 - 12: 100
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: 'c'
 - 18: { c: '20', d: '20' }
 - 19: 'd'
 - 20: 100
 - 21: 'c'
 - 22: { c: '20', d: '20' }
 - 23: 'd'
 - 24: 100
 - 25: 'c'
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
