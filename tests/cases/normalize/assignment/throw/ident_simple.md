# Preval test case

# ident_simple.md

> normalize > assignment > throw > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
throw a = b;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
{
  a = b;
  let tmpStmtArg = b;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
a = 2;
throw 2;
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ 2 ]>

Normalized calls: Same

Final output calls: Same
