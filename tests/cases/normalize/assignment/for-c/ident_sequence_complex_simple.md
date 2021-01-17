# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (;;a = ($(b), $(c)).x = c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
{
  while (true) {
    $(b);
    tmpNestedAssignObj = $(c);
    tmpNestedAssignObj.x = c;
    a = c;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
while (true) {
  $(2);
  tmpNestedAssignObj = $(3);
  tmpNestedAssignObj.x = 3;
  a = 3;
}
$(a, 2, 3);
`````
