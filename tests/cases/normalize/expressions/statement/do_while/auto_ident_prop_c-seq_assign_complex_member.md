# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> normalize > expressions > statement > do_while > auto_ident_prop_c-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (((1, 2, $(b)).c = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpNestedAssignObj = $(b);
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpIfTest = tmpNestedPropAssignRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpNestedAssignObj = $(b);
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpIfTest = tmpNestedPropAssignRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: { c: '20', d: '20' }
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: { c: '20', d: '20' }
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: { c: '20', d: '20' }
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 100
 - 18: { c: '20', d: '20' }
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same