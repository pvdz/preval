# Preval test case

# group_arg3.md

> Normalize > Unary > Delete > Group arg3
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
var foo = 1;
$(delete (null, foo));
$(typeof foo)
`````

## Settled


`````js filename=intro
$(true);
$(`number`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`number`);
`````

## Pre Normal


`````js filename=intro
let foo = undefined;
foo = 1;
$(delete (null, foo));
$(typeof foo);
`````

## Normalized


`````js filename=intro
let foo = undefined;
foo = 1;
const tmpCalleeParam = true;
$(tmpCalleeParam);
const tmpCalleeParam$1 = typeof foo;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "number" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
