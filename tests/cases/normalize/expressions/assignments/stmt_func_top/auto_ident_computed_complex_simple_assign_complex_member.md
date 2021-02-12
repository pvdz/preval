# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  a = $(b)["c"] = $(b)[$("d")];
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj['c'] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
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
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj['c'] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
