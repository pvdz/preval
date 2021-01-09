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

## Uniformed

`````js filename=intro
var x;
x();
x = x;
x();
`````

## Output

`````js filename=intro
var tmpNewObj;
$();
tmpNewObj = Date;
tmpNewObj();
`````
