# Preval test case

# ident_bin.md

> normalize > assignment > for-b > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 0, c = 0;
for (;a = b + c;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 0;
let c = 0;
{
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
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
while (true) {
  a = 0;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, 0, 0);
`````

## Result

Should call `$` with:
[[0, 0, 0], null];

Normalized calls: Same

Final output calls: Same
