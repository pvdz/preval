# Preval test case

# property.md

> normalize > compound > property
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

#TODO

## Input

`````js filename=intro
const obj = {
  x: 0
};
obj.x += 5;
$(obj.x); // 5
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpArg;
const obj = { x: 0 };
tmpBinaryLeft = obj.x;
obj.x = tmpBinaryLeft + 5;
tmpArg = obj.x;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = { x: 8 };
x = x.x;
x.x = x * 8;
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpArg;
const obj = { x: 0 };
tmpBinaryLeft = obj.x;
obj.x = tmpBinaryLeft + 5;
tmpArg = obj.x;
$(tmpArg);
`````
