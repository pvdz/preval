# Preval test case

# simple_implicit_read_write.md

> Globals > Simple implicit read write
>
> Writing to an implicit global

## Options

Shrug

- skipEval

## Input

`````js filename=intro
$(a);
$(a = 5);
`````

## Settled


`````js filename=intro
$(a);
a = 5;
const tmpCalleeParam /*:unknown*/ = a;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(a);
a = 5;
$(a);
`````

## Pre Normal


`````js filename=intro
$(a);
$((a = 5));
`````

## Normalized


`````js filename=intro
$(a);
a = 5;
let tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( a );
a = 5;
const b = a;
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
