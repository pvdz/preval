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
var tmpComplexMemberObj;
tmpElement = 5 + 5;
tmpElement_1 = $();
tmpComplexMemberObj = Array.prototype;
tmpElement_2 = tmpComplexMemberObj.length;
tmpArg = [tmpElement, tmpElement_1, tmpElement_2];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var tmpComplexMemberObj;
tmpElement = 10;
tmpElement_1 = $();
tmpComplexMemberObj = Array.prototype;
tmpElement_2 = tmpComplexMemberObj.length;
tmpArg = [tmpElement, tmpElement_1, tmpElement_2];
$(tmpArg);
`````
