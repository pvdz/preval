# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > statement > logic_or_right > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(100) || ((1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  1;
  2;
  const tmpAssignMemLhsObj = b;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpAssignMemLhsObj = b;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 
  { a: '999', b: '1000' },
  { c: '10', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
