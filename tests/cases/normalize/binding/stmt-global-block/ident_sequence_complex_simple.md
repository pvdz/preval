# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = ($(b), $(c)).x = c;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let a;
  $(b);
  const tmpNestedAssignObj = $(c);
  const tmpNestedPropAssignRhs = c;
  tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let a;
  $(2);
  const tmpNestedAssignObj = $(3);
  tmpNestedAssignObj.x = 3;
  a = 3;
  $(a, 2, 3);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3
 - 4: 3, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
