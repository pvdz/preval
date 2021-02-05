# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > statement > do_while > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  tmpDoWhileTest = tmpNestedPropAssignRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  tmpDoWhileTest = tmpNestedPropAssignRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 100
 - 7: { c: '20', d: '20' }
 - 8: 'c'
 - 9: { c: '20', d: '20' }
 - 10: 'd'
 - 11: 100
 - 12: { c: '20', d: '20' }
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: 'c'
 - 24: { c: '20', d: '20' }
 - 25: 'd'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
