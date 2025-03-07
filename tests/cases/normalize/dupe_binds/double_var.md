# Preval test case

# double_var.md

> Normalize > Dupe binds > Double var
>
> Vars can be redeclared many times. Doesn't matter.

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
`````

## Settled


`````js filename=intro
$(1);
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
