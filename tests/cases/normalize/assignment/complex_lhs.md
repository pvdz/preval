# Preval test case

# complex_lhs.md

> normalize > assignment > complex_lhs
>
> Lhs of assignment can have side effects too

#TODO

## Input

`````js filename=intro
$({}).foo = 10;
`````

## Normalized

`````js filename=intro
var tmpAssignMemberObj;
tmpAssignMemberObj = $({});
tmpAssignMemberObj.foo = 10;
`````

## Uniformed

`````js filename=intro
var x;
x = x({});
x.x = 8;
`````

## Output

`````js filename=intro
var tmpAssignMemberObj;
tmpAssignMemberObj = $({});
tmpAssignMemberObj.foo = 10;
`````
