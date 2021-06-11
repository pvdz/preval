# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > For-a > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = b[$('x')] = c;false;) $(a, b, c);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3;
{
  let a$1 = (b[$('x')] = c);
  while (false) {
    $(a$1, b, c);
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## Output

`````js filename=intro
const varInitAssignLhsComputedProp = $('x');
const b = { x: 2 };
b[varInitAssignLhsComputedProp] = 3;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
