# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > stmt > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = b.x = c + d;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  let d = 4;
  let a;
  let tmpNestedAssignPropRhs = c + d;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let a;
  b.x = 7;
  a = 7;
  $(a, b, 7);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 7, { x: '7' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: true
 - 2: 7, { x: '7' }, 7
 - eval returned: undefined
