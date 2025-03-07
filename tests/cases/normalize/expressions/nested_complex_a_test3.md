# Preval test case

# nested_complex_a_test3.md

> Normalize > Expressions > Nested complex a test3
>
> Nested assignments should be split up

## Input

`````js filename=intro
let a = $([]), b;
//$($(a).length);
//$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
$($(a).length);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpCompObj /*:unknown*/ = $(a);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj.length;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($([])).length);
`````

## Pre Normal


`````js filename=intro
let a = $([]),
  b;
$($(a).length);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [];
let a = $(tmpCalleeParam);
let b = undefined;
const tmpCompObj = $(a);
const tmpCalleeParam$1 = tmpCompObj.length;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
const d = c.length;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - 2: []
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
