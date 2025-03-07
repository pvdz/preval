# Preval test case

# single_bang_sequence.md

> Normalize > Unary > Inv > Single bang sequence
>
> This is an example of a single bang that can be moved into a sequence

## Input

`````js filename=intro
var x;
$(!((x = 'foo'), $(x)));
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(`foo`);
$(!tmpUnaryArg);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(!((x = `foo`), $(x)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = `foo`;
const tmpUnaryArg = $(x);
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = !a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
