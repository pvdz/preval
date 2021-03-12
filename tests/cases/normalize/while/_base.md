# Preval test case

# _base.md

> Normalize > While > Base
>
> A while is a while

#TODO

## Input

`````js filename=intro
let x = true;
while (x) {
  x = false;
}
$(1);
`````

## Normalized

`````js filename=intro
let x = true;
while (true) {
  if (x) {
    x = false;
  } else {
    break;
  }
}
$(1);
`````

## Output

`````js filename=intro
let x = true;
while (true) {
  if (x) {
    x = false;
  } else {
    break;
  }
}
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
