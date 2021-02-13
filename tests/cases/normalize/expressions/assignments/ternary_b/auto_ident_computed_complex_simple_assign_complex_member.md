# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > assignments > ternary_b > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)["c"] = $(b)[$("d")]) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
