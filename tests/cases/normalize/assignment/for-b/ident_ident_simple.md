# Preval test case

# ident_ident_simple.md

> normalize > assignment > for-b > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 0;
for (;a = b = c;);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 0;
{
  while (true) {
    b = c;
    a = c;
    const tmpIfTest = c;
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
let b = 2;
while (true) {
  b = 0;
  a = 0;
  break;
}
$(a, b, 0);
`````

## Result

Should call `$` with:
 - 0: 0,0,0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
