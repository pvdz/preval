# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > statement > return > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f() {
  return ($(b)["c"] = $(b)[$("d")]);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
  const tmpReturnArg = varInitAssignLhsComputedRhs;
  return tmpReturnArg;
}
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  varInitAssignLhsComputedObj['c'] = varInitAssignLhsComputedRhs;
  const tmpReturnArg = varInitAssignLhsComputedRhs;
  return tmpReturnArg;
}
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: Same