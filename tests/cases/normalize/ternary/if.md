# Preval test case

# var.md

> normalize > ternary > var
>
> Example of rewriting an if with ternary

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
if ( a ? b : c) $(100);
else $(200);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let tmpIfTest = undefined;
if (a) {
  tmpIfTest = b;
} else {
  tmpIfTest = c;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
`````

## Output

`````js filename=intro
let tmpIfTest = undefined;
if (1) {
  tmpIfTest = 2;
} else {
  tmpIfTest = 3;
}
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
