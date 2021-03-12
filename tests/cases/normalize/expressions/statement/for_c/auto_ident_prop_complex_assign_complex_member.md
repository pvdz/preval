# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident prop complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b).c = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b).c = $(b)[$('d')];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignMemLhsObj = $(b);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
    tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpAssignMemLhsObj = $(b);
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: { c: '20', d: '20' }
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: { c: '20', d: '20' }
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: { c: '20', d: '20' }
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
