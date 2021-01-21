# Preval test case

# sequence-simple.md

> normalize > assignment > switch-discriminant > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
switch ((a, b).c = d) {}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let d = 3;
{
  {
    a;
    b.c = d;
  }
  const tmpSwitchTest = d;
  {
    let tmpFallthrough = false;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
b.c = 3;
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same