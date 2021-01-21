# Preval test case

# member.md

> normalize > unary > inv > member
>
> Inverting a member expression is two things

#TODO

## Input

`````js filename=intro
$(!Date.length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = Date.length;
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = Date.length;
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: undefined

Normalized calls: Same

Final output calls: Same
