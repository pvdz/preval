# Preval test case

# call.md

> normalize > new > call
>
> An array with complex elements should be normalized to a temp var

## Input

`````js filename=intro
$([5 + 5, $(), Array.prototype.length]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpMemberComplexObj;
tmpElement = 5 + 5;
tmpElement$1 = $();
tmpMemberComplexObj = Array.prototype;
tmpElement$2 = tmpMemberComplexObj.length;
tmpArg = [tmpElement, tmpElement$1, tmpElement$2];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement$1;
var tmpElement$2;
var tmpMemberComplexObj;
tmpElement = 10;
tmpElement$1 = $();
tmpMemberComplexObj = Array.prototype;
tmpElement$2 = tmpMemberComplexObj.length;
tmpArg = [tmpElement, tmpElement$1, tmpElement$2];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: [10,null,0]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
