# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_computed_simple_simple_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };

    let a = (b["c"] = $(b)[$("d")]);
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
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
  const b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
