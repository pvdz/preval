# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > for-in-right > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let x in (a = $(b).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForInLhsDecl;
  {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignObj.x = c;
    a = c;
    const tmpForInRhs = a;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let tmpForInLhsDecl;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.x = 3;
a = 3;
const tmpForInRhs = a;
for (tmpForInLhsDecl in tmpForInRhs) {
}
$(a, b, 3);
`````
