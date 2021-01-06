# Preval test case

# spread_member.md

> normalize > array > spread_member
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...true.toString.name]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpComplexMemberObj;
tmpComplexMemberObj = true.toString;
tmpElement = tmpComplexMemberObj.name;
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpComplexMemberObj;
tmpComplexMemberObj = true.toString;
tmpElement = tmpComplexMemberObj.name;
tmpArg = [...tmpElement];
$(tmpArg);
`````