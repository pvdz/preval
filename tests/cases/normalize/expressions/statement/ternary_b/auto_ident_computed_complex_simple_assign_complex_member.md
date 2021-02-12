# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > statement > ternary_b > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(1) ? ($(b)["c"] = $(b)[$("d")]) : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignMemLhsObj = $(b);
  const tmpAssignComputedObj = tmpAssignMemLhsObj;
  const tmpAssignComputedProp = 'c';
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignMemLhsObj = $(b);
  const tmpAssignComputedObj = tmpAssignMemLhsObj;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj['c'] = tmpAssignComputedRhs;
} else {
  $(200);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
