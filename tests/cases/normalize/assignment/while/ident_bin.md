# Preval test case

# ident_bin.md

> normalize > assignment > while > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 0, c = 0;
while (a = b + c);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 0;
let c = 0;
while (true) {
  a = b + c;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
while (true) {
  a = 0;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, 0, 0);
`````

## Result

Should call `$` with:
 - 0: 0,0,0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
