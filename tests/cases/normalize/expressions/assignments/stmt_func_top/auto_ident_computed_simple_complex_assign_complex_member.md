# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  a = b[$("c")] = $(b)[$("d")];
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  a = b[$(`c`)] = $(b)[$(`d`)];
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignComMemberObj = b;
  const tmpNestedAssignComMemberProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
$(tmpNestedAssignPropRhs, b);
$(undefined);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
