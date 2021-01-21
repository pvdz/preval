# Preval test case

# member_complex_bin.md

> normalize > assignment > for-let > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let wat = $(a).x = b + c; false;) $(wat);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpBindInitMemberObject = $(a);
  let tmpBindInitRhs = b + c;
  tmpBindInitMemberObject.x = tmpBindInitRhs;
  let wat = tmpBindInitRhs;
  while (false) {
    $(wat);
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
let tmpBindInitMemberObject = $(a);
tmpBindInitMemberObject.x = 5;
while (false) {
  $(5);
}
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], [{ x: 5 }, 5, 3], null];

