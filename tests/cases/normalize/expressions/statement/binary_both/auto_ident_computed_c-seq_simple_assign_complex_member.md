# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> normalize > expressions > statement > binary_both > auto_ident_computed_c-seq_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
((1, 2, $(b))[$("c")] = $(b)[$("d")]) + ((1, 2, $(b))[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('c');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpCompObj = $(b);
const tmpCompProp = $('d');
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsObj$1 = $(b);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: { c: '20', d: '20' }
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
