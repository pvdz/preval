# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > for-a > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = $(b).x = c;false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let a_1;
  const tmpNestedAssignObj = $(b);
  const tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a_1 = tmpNestedPropAssignRhs;
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
