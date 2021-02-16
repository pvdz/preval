# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > statement > arr_element > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
((1, 2, b)[$("c")] = $(b)[$("d")]) + ((1, 2, b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = b;
const tmpAssignComMemLhsProp = $('c');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsObj$1 = b;
const tmpAssignComMemLhsProp$1 = $('c');
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpAssignComMemLhsProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsProp$1 = $('c');
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $('d');
const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
b[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'c'
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
