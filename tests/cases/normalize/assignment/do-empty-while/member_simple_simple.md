# Preval test case

# member_simple_simple.md

> normalize > assignment > do-while > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 0, c = 3;
do {} while (a.x = b);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 0;
let c = 3;
while (true) {
  a.x = b;
  const tmpIfTest = b;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
while (true) {
  a.x = 0;
  break;
}
$(a, 0, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":0},0,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
