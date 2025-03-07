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

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
tmpAssignMemLhsObj.length = undefined;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignMemLhsObj = $($([]));
tmpAssignMemLhsObj.length = undefined;
`````

## Pre Normal


`````js filename=intro
let a = $([]),
  b;
$(a).length = b;
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [];
let a = $(tmpCalleeParam);
let b = undefined;
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.length = b;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
c.length = undefined;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: ('<crash[ Invalid array length ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
