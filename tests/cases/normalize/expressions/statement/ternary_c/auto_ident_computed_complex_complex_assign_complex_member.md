# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > statement > ternary_c > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ($(b)[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $('c');
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
