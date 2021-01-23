# Preval test case

# ident_bin.md

> normalize > assignment > throw > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
throw a = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  a = b + c;
  let tmpThrowArg = a;
  throw tmpThrowArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
a = 5;
let tmpThrowArg = a;
throw tmpThrowArg;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ 5 ]>

Normalized calls: Same

Final output calls: Same
