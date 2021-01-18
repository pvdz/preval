# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > throw > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
throw a = b.x = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
{
  b.x = c;
  a = c;
  let tmpStmtArg = a;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
b.x = 3;
a = 3;
let tmpStmtArg = a;
throw tmpStmtArg;
$(a, b, 3);
`````

## Result

Should call `$` with:
['<crash[ 3 ]>'];

Normalized calls: Same

Final output calls: Same
