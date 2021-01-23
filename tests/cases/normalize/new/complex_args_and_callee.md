# Preval test case

# call.md

> normalize > new > call
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

#TODO

## Input

`````js filename=intro
$(new ($())(5 + 5, $(), Array.prototype.length));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
var tmpMemberComplexObj;
var tmpNewObj;
tmpArg$1 = 5 + 5;
tmpArg$2 = $();
tmpMemberComplexObj = Array.prototype;
tmpArg$3 = tmpMemberComplexObj.length;
tmpNewObj = $();
tmpArg = new tmpNewObj(tmpArg$1, tmpArg$2, tmpArg$3);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
var tmpMemberComplexObj;
var tmpNewObj;
tmpArg$1 = 10;
tmpArg$2 = $();
tmpMemberComplexObj = Array.prototype;
tmpArg$3 = tmpMemberComplexObj.length;
tmpNewObj = $();
tmpArg = new tmpNewObj(tmpArg$1, tmpArg$2, tmpArg$3);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 
 - 2: <crash[ <ref> is not a constructor ]>

Normalized calls: Same

Final output calls: Same
