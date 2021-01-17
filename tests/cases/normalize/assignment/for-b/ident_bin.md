# Preval test case

# ident_bin.md

> normalize > assignment > for-b > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (;a = b + c;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  while (true) {
    {
      a = b + c;
      let ifTestTmp = a;
      if (ifTestTmp) {
        break;
      } else {
      }
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
    break;
  } else {
  }
}
$(a, 5, 3);
`````
