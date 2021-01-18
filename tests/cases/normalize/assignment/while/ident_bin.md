# Preval test case

# ident_bin.md

> normalize > assignment > while > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
while (a = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
while (true) {
  {
    a = b + c;
    let ifTestTmp = a;
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
let a = 1;
while (true) {
  a = 5;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, 5, 3);
`````
