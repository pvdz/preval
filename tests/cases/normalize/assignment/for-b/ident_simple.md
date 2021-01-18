# Preval test case

# ident_simple.md

> normalize > assignment > for-b > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (;a = b;);
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
      a = b;
      let ifTestTmp = b;
      if (ifTestTmp) {
      } else {
        break;
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
  a = 2;
}
$(a, 2, 3);
`````
