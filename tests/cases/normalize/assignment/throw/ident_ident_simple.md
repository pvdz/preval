# Preval test case

# ident_ident_simple.md

> normalize > assignment > throw > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
throw a = b = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  b = c;
  a = c;
  let tmpThrowArg = a;
  throw tmpThrowArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
b = 3;
a = 3;
let tmpThrowArg = a;
throw tmpThrowArg;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ 3 ]>

Normalized calls: Same

Final output calls: Same
