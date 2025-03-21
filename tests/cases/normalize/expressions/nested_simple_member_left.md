# Preval test case

# nested_simple_member_left.md

> Normalize > Expressions > Nested simple member left
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = {};
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpClusterSSA_a);
varInitAssignLhsComputedObj.x = 30;
$(30);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({});
varInitAssignLhsComputedObj.x = 30;
$(30);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = {}), (b = 20), (c = 30);
$(($(a).x = b = c));
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = {};
b = 20;
c = 30;
const varInitAssignLhsComputedObj = $(a);
b = c;
let varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
b.x = 30;
$( 30 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
