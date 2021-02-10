# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > stmt > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = $(b).x = c;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  let a;
  const tmpNestedAssignObj = $(b);
  const tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
