# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

```
$(a).length = b;
// -->
(tmp = $(a), tmp).length = b;
// ->
(tmp = $(a), tmp.length = b);
// ->
tmp = $(a); tmp.length = b;
```

#TODO

## Input

`````js filename=intro
//var a = [], b = 20, c = 30;
//$($(a).length);
//$($(a).length = b);
$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Normalized

`````js filename=intro
var tmpAssignMemberObj;
tmpAssignMemberObj = $(a);
tmpAssignMemberObj.length = b;
`````

## Uniformed

`````js filename=intro
var x;
x = x(x);
x.x = x;
`````

## Output

`````js filename=intro
var tmpAssignMemberObj;
tmpAssignMemberObj = $(a);
tmpAssignMemberObj.length = b;
`````
