# Preval test case

# member_simple_simple.md

> normalize > assignment > template > member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$(`abc ${a.x = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = `abc ${(a.x = b)} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = { x: 10 };
tmpArg = `abc ${(a.x = 2)} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[['abc 2 def'], [{ x: 2 }, 2, 3], null];

Normalized calls: Same

Final output calls: Same
