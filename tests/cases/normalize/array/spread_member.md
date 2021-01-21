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
var tmpMemberComplexObj;
tmpMemberComplexObj = true.toString;
tmpElement = tmpMemberComplexObj.name;
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpMemberComplexObj;
tmpMemberComplexObj = true.toString;
tmpElement = tmpMemberComplexObj.name;
tmpArg = [...tmpElement];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: ["t","o","S","t","r","i","n","g"]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
