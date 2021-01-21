# Preval test case

# member_complex_bin.md

> normalize > assignment > throw > member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
throw $(a).x = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpBindInitMemberObject = $(a);
  let tmpBindInitRhs = b + c;
  tmpBindInitMemberObject.x = tmpBindInitRhs;
  let tmpStmtArg = tmpBindInitRhs;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = { x: 10 };
let tmpBindInitMemberObject = $(a);
tmpBindInitMemberObject.x = 5;
throw 5;
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: <crash[ Cannot set property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
