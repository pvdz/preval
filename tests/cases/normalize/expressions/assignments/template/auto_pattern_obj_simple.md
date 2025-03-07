# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Assignments > Template > Auto pattern obj simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````

## Settled


`````js filename=intro
$(1, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
`````

## Pre Normal


`````js filename=intro
let { a: a, b: b } = { a: 1, b: 2 };
$(a, b);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 1, b: 2 };
let a = bindingPatternObjRoot.a;
let b = bindingPatternObjRoot.b;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
