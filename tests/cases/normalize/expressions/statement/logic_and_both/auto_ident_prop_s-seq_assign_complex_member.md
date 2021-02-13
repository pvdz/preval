# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > statement > logic_and_both > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
((1, 2, b).c = $(b)[$("d")]) && ((1, 2, b).c = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  const tmpAssignMemLhsObj = b;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  const tmpAssignMemRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  const tmpAssignMemLhsObj = b;
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  const tmpAssignMemRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
