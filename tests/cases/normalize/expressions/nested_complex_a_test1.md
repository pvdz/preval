# Preval test case

# nested_complex_a_test1.md

> Normalize > Expressions > Nested complex a test1
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
let a = $([]), b;
//var a = [], b = 20, c = 30;
//$($(a).length);
//$($(a).length = b);
$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Pre Normal

`````js filename=intro
let a = $([]),
  b;
$(a).length = b;
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [];
let a = tmpCallCallee(tmpCalleeParam);
let b = undefined;
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.length = b;
`````

## Output

`````js filename=intro
const tmpCalleeParam = [];
const a = $(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.length = undefined;
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
c.length = undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: ('<crash[ Invalid array length ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
