# Preval test case

# unused_label_loop.md

> Labels > Unused label loop
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
let x = 2;
foo: while (--x) $(x);
`````

## Normalized

`````js filename=intro
let x = 2;
while (true) {
  x = x - 1;
  let tmpIfTest = x;
  if (tmpIfTest) {
    $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = 2;
while (true) {
  x = x - 1;
  const tmpIfTest = x;
  if (tmpIfTest) {
    $(x);
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
