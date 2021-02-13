# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c)).x = $(c);false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs = $(c);
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  $(b);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs = $(c);
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a_1 = varInitAssignLhsComputedRhs;
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
