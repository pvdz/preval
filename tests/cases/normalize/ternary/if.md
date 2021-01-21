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
{
  let ifTestTmp;
  if (a) {
    ifTestTmp = b;
  } else {
    ifTestTmp = c;
  }
  if (ifTestTmp) {
    $(100);
  } else {
    $(200);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp;
ifTestTmp = 2;
if (ifTestTmp) {
  $(100);
} else {
  $(200);
}
`````

## Result

Should call `$` with:
 - 0: 100
 - 1: undefined

Normalized calls: Same

Final output calls: Same
