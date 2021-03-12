# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident computed complex complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$('c')] = $(b)[$('d')]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  tmpCalleeParam = varInitAssignLhsComputedRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
  { a: '999', b: '1000' },
  { c: '10', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
