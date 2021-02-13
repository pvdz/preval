# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > bindings > stmt_func_top > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = ($(b)[$("c")] = $(b)[$("d")]);
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
