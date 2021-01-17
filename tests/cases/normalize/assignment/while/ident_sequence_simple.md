# Preval test case

# ident_sequence_simple.md

> normalize > assignment > while > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
while (a = ($(b), c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
while (true) {
  {
    $(b);
    a = c;
    let ifTestTmp = a;
    if (ifTestTmp) {
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
  $(2);
  a = 3;
  let ifTestTmp = a;
  if (ifTestTmp) {
    break;
  }
}
$(a, 2, 3);
`````
