# Preval test case

# sequence-simple.md

> normalize > assignment > throw > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
throw (a, b).c = d;
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  {
    a;
    b.c = d;
  }
  let tmpThrowArg = d;
  throw tmpThrowArg;
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { c: 2 };
b.c = 3;
throw 3;
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ 3 ]>

Normalized calls: Same

Final output calls: Same
