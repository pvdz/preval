# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_nested_member_complex_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 },
      c = { y: 2 },
      d = 3,
      e = 4;

    let a = ($(b)[$("x")] = $(c)[$("y")] = d + e);
    $(a, b, c, d, e);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let e = 4;
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $('y');
  const varInitAssignLhsComputedRhs$1 = d + e;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c, d, e);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { x: 1 };
  let c = { y: 2 };
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $('y');
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  $(7, b, c, 3, 4);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 7, { x: '7' }, { y: '7' }, 3, 4
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
