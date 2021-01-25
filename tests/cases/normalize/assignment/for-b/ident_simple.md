# Preval test case

# ident_simple.md

> normalize > assignment > for-b > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 0, c = 3;
for (;a = b;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 0;
let c = 3;
{
  while (true) {
    a = b;
    const tmpIfTest = b;
    if (tmpIfTest) {
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
  a = 0;
  break;
}
$(a, 0, 3);
`````

## Result

Should call `$` with:
 - 0: 0,0,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
