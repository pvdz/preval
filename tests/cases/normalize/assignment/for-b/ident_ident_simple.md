# Preval test case

# ident_ident_simple.md

> normalize > assignment > for-b > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (;a = b = c;);
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
      b = c;
      a = c;
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
let b = 2;
while (true) {
  b = 3;
  a = 3;
  let ifTestTmp = a;
  if (ifTestTmp) {
    break;
  } else {
  }
}
$(a, b, 3);
`````
