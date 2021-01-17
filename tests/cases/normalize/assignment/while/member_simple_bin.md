# Preval test case

# member_simple_bin.md

> normalize > assignment > while > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
while (a.x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    tmpBindInitMemberObject.x = tmpBindInitRhs;
    let ifTestTmp = tmpBindInitRhs;
    if (ifTestTmp) {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
while (true) {
  let tmpBindInitMemberObject = a;
  tmpBindInitMemberObject.x = 5;
  break;
}
$(a, 5, 3);
`````
