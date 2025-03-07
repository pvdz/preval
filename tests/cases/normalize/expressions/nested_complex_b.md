# Preval test case

# nested_complex_b.md

> Normalize > Expressions > Nested complex b
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = [], c = 30;
$(a = $(b).length = c);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_b /*:array*/ = [];
const tmpNestedAssignObj /*:unknown*/ = $(tmpClusterSSA_b);
tmpNestedAssignObj.length = 30;
$(30);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObj = $([]);
tmpNestedAssignObj.length = 30;
$(30);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = []), (c = 30);
$((a = $(b).length = c));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = [];
c = 30;
const tmpNestedAssignObj = $(b);
const tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
b.length = 30;
$( 30 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
