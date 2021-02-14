# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > statement > arr_element > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
(b["c"] = $(b)[$("d")]) + (b["c"] = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignComputedObj = b;
const tmpAssignComputedProp = 'c';
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComputedObj$1 = b;
const tmpAssignComputedProp$1 = 'c';
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
b['c'] = tmpAssignComputedRhs;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
b['c'] = tmpAssignComputedRhs$1;
$(a, b);
`````

## Globals

None

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
