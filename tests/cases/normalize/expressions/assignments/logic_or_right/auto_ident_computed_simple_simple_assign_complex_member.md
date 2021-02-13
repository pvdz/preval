# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > assignments > logic_or_right > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) || (a = b["c"] = $(b)[$("d")]));
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
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b['c'] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b['c'] = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  tmpCalleeParam = varInitAssignLhsComputedRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
  { a: '999', b: '1000' },
  { c: '10', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
