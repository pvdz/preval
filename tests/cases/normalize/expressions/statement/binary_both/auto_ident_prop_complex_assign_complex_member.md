# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> normalize > expressions > statement > binary_both > auto_ident_prop_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
($(b).c = $(b)[$("d")]) + ($(b).c = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = $(b);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
const tmpAssignMemLhsObj$2 = $(b);
const tmpAssignMemLhsObj$3 = tmpAssignMemLhsObj$2;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignMemRhs$1 = tmpCompObj$1[tmpCompProp$1];
tmpAssignMemLhsObj$3.c = tmpAssignMemRhs$1;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
const tmpAssignMemLhsObj$2 = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignMemRhs$1 = tmpCompObj$1[tmpCompProp$1];
tmpAssignMemLhsObj$2.c = tmpAssignMemRhs$1;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: { c: '20', d: '20' }
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
