# Preval test case

# member_simple_bin.md

> normalize > assignment > do-while > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 0, c = 0;
do {} while (a.x = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 0;
let c = 0;
while (true) {
  {
    let tmpBindInitMemberObject = a;
    let tmpBindInitRhs = b + c;
    tmpBindInitMemberObject.x = tmpBindInitRhs;
    let ifTestTmp = tmpBindInitRhs;
    if (ifTestTmp) {
    } else {
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
  tmpBindInitMemberObject.x = 0;
  break;
}
$(a, 0, 0);
`````

## Result

Should call `$` with:
[[{ x: 0 }, 0, 0], null];

Normalized calls: Same

Final output calls: Same
