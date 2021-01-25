# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > do-while > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 0;
do {} while (a = b.x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
let c = 0;
while (true) {
  tmpNestedPropAssignRhs = c;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = tmpNestedPropAssignRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropAssignRhs;
let a = 1;
let b = { x: 2 };
while (true) {
  tmpNestedPropAssignRhs = 0;
  b.x = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  const tmpIfTest = tmpNestedPropAssignRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 0);
`````

## Result

Should call `$` with:
 - 0: 0,{"x":0},0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
