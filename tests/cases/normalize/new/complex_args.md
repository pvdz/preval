# Preval test case

# call.md

> normalize > new > call
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

#TODO

## Input

`````js filename=intro
$(new Array(5 + 5, $(), Array.prototype.length));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpArg_2;
var tmpArg_3;
var tmpComplexMemberObj;
tmpArg_1 = 5 + 5;
tmpArg_2 = $();
tmpComplexMemberObj = Array.prototype;
tmpArg_3 = tmpComplexMemberObj.length;
tmpArg = new Array(tmpArg_1, tmpArg_2, tmpArg_3);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = 8 * 8;
x = x();
x = x.x;
x = x.x;
x = new x(x, x, x);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpArg_2;
var tmpArg_3;
var tmpComplexMemberObj;
tmpArg_1 = 10;
tmpArg_2 = $();
tmpComplexMemberObj = Array.prototype;
tmpArg_3 = tmpComplexMemberObj.length;
tmpArg = new Array(tmpArg_1, tmpArg_2, tmpArg_3);
$(tmpArg);
`````
