# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Objlit dyn prop > Auto ident computed complex simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
({ [($(b)["c"] = $(b)[$("d")])]: 10 });
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
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
