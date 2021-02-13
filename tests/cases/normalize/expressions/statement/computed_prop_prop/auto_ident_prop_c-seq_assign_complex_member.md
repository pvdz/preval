# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_prop_c-seq_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[((1, 2, $(b)).c = $(b)[$("d")])];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
const tmpCompProp = varInitAssignLhsComputedRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const varInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
obj[varInitAssignLhsComputedRhs];
$(a, b);
`````

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
