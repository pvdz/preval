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
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
{
  tmpAssignMemLhsObj = $(a);
  tmpAssignMemRhs = b;
  tmpAssignMemLhsObj.length = tmpAssignMemRhs;
}
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = b;
tmpAssignMemLhsObj.length = tmpAssignMemRhs;
`````

## Result

Should call `$` with:
[[[10, 20, 30]], "<crash[ Cannot set property 'length' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
