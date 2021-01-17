# Preval test case

# member_simple_simple.md

> normalize > assignment > while > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
while (a.x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
while (true) {
  {
    a.x = b;
    let ifTestTmp = b;
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
  a.x = 2;
  break;
}
$(a, 2, 3);
`````
