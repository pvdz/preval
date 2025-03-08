# Preval test case

# nested_complex_a_test4.md

> Normalize > Expressions > Nested complex a test4
>
> Nested assignments should be split up

## Input

`````js filename=intro
let a = $([]), b;
//$($(a).length);
$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const varInitAssignLhsComputedObj /*:unknown*/ = $(a);
varInitAssignLhsComputedObj.length = undefined;
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $($([]));
varInitAssignLhsComputedObj.length = undefined;
$(undefined);
`````

## Pre Normal


`````js filename=intro
let a = $([]),
  b;
$(($(a).length = b));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [];
let a = $(tmpCalleeParam);
let b = undefined;
const varInitAssignLhsComputedObj = $(a);
const varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.length = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
c.length = undefined;
$( undefined );
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
