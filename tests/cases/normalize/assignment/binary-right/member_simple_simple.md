# Preval test case

# member_simple_simple.md

> normalize > assignment > binary-right > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(500 + (a.x = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
let a = { x: 10 };
let b = 2;
let c = 3;
a.x = b;
tmpBinaryRight = b;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryRight;
let a = { x: 10 };
a.x = 2;
tmpBinaryRight = 2;
tmpArg = 500 + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[502], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
