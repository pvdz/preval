# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> normalize > expressions > statement > for_a > auto_ident_prop_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (b.c = $(b)[$("d")]; $(0); );
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  const tmpAssignMemLhsObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
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
const tmpAssignMemLhsObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 0
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
