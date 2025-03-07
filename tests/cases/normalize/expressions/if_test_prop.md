# Preval test case

# if_test_prop.md

> Normalize > Expressions > If test prop
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let y;
if (({ x } = 1).foo) y;
`````

## Settled


`````js filename=intro
x = (1).x;
(1).foo;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = (1).x;
(1).foo;
`````

## Pre Normal


`````js filename=intro
let y;
if (({ x: x } = 1).foo) null;
`````

## Normalized


`````js filename=intro
let y = undefined;
let tmpCompObj = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCompObj = tmpNestedAssignObjPatternRhs;
const tmpIfTest = tmpCompObj.foo;
`````

## PST Settled
With rename=true

`````js filename=intro
x = 1.x;
1.foo;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
