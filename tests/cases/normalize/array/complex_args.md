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
var tmpElement_1;
var tmpElement_2;
var tmpMemberComplexObj;
tmpElement = 5 + 5;
tmpElement_1 = $();
tmpMemberComplexObj = Array.prototype;
tmpElement_2 = tmpMemberComplexObj.length;
tmpArg = [tmpElement, tmpElement_1, tmpElement_2];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpMemberComplexObj;
tmpElement = 10;
tmpElement_1 = $();
tmpMemberComplexObj = Array.prototype;
tmpElement_2 = tmpMemberComplexObj.length;
tmpArg = [tmpElement, tmpElement_1, tmpElement_2];
$(tmpArg);
`````
