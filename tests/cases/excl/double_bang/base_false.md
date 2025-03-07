# Preval test case

# base_false.md

> Excl > Double bang > Base false
>
> A double bang is really just a Boolean

## Input

`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const c /*:boolean*/ = Boolean(a);
$(c);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(0)));
`````

## Pre Normal


`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## Normalized


`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
