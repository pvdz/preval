# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(b[$("c")] = $(b)[$("d")])];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(b[$(`c`)] = $(b)[$(`d`)])];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpCompProp = varInitAssignLhsComputedRhs;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const obj = {};
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
obj[varInitAssignLhsComputedRhs];
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
