# Preval test case

# init_assign.md

> normalize > binding > init_assign
>
> Should normalize assignment init to separate line

#TODO

## Input

`````js filename=intro
let b = 10;
let c = 20;
let a = b.x = c.x
`````

## Normalized

`````js filename=intro
let b = 10;
let c = 20;
let tmpBindInitMemberObject = b;
let tmpBindInitRhs = c.x;
tmpBindInitMemberObject.x = tmpBindInitRhs;
let a = tmpBindInitRhs;
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = 8;
var x = x;
var x = x.x;
x.x = x;
var x = x;
`````

## Output

`````js filename=intro
let tmpBindInitRhs = (20).x;
(10).x = tmpBindInitRhs;
`````
