# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > statement > for_c > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpAssignMemLhsObj = b;
      const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
      tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpAssignMemLhsObj = b;
      const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
      tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
    } else {
      break;
    }
  }
}
$(a, b);
`````

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same