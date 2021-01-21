# Preval test case

# call_stmt.md

> normalize > sequence > call_stmt
>
> Expression statement that is a call with callee that is a sequence

#TODO

## Input

`````js filename=intro
($(), Date)();
`````

## Normalized

`````js filename=intro
var tmpNewObj;
$();
tmpNewObj = Date;
tmpNewObj();
`````

## Output

`````js filename=intro
var tmpNewObj;
$();
tmpNewObj = Date;
tmpNewObj();
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
