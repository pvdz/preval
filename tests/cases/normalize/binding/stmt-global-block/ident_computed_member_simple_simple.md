# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > Stmt-global-block > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = b[$('x')] = c;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedProp = $('x');
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const b = { x: 2 };
  const varInitAssignLhsComputedProp = $('x');
  b[varInitAssignLhsComputedProp] = 3;
  $(3, b, 3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
