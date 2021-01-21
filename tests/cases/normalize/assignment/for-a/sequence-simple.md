# Preval test case

# sequence-simple.md

> normalize > assignment > for-a > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for ((a, b).c = d;false;);
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
  while (false) {}
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
b.c = 3;
while (false) {}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
