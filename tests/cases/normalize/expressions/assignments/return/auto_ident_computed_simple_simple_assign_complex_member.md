# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > assignments > return > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b["c"] = $(b)[$("d")]);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b['c'] = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.c = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
