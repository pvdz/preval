# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  a = (1, 2, b)[$("c")] = $(b)[$("d")];
  $(a, b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
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
  const b = { c: 10, d: 20 };
  const tmpNestedAssignComMemberProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
