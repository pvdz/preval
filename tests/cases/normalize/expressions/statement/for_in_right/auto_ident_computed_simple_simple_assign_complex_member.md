# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > statement > for_in_right > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let x in (b["c"] = $(b)[$("d")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
const tmpForInDeclRhs = varInitAssignLhsComputedRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
let x;
for (x in varInitAssignLhsComputedRhs) {
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
