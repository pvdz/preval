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
var tmpObj;
tmpObj = $(a);
tmpObj.length = b;
`````

## Output

`````js filename=intro
var tmpObj;
tmpObj = $(a);
tmpObj.length = b;
`````
