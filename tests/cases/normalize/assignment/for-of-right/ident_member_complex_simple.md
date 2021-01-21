# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > for-of-right > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let x of (a = $(b).x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
let a = 1;
let b = { x: 2 };
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    tmpNestedAssignObj = $(b);
    tmpNestedAssignObj.x = c;
    a = c;
    const tmpForOfRhs = a;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
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
let tmpForOfLhsDecl;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.x = 3;
a = 3;
const tmpForOfRhs = a;
for (tmpForOfLhsDecl of tmpForOfRhs) {
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":3}
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
