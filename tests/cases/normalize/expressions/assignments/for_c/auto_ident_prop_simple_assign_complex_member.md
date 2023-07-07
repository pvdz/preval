# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > For c > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); a = b.c = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = b.c = $(b)[$(`d`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  tmpIfTest = $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
const b = { c: 10, d: 20 };
while (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  b.c = tmpNestedAssignPropRhs;
  a = tmpNestedAssignPropRhs;
  tmpIfTest = $(1);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 1
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 1
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 1
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 1
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 1
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
