# Preval test case

# double_bang_sequence.md

> Normalize > Unary > Inv > Double bang sequence
>
> This is an example of a double bang that can be moved into a sequence

## Input

`````js filename=intro
var x;
$(!!((x = 'foo'), $(x)));
`````

## Settled


`````js filename=intro
const tmpUnaryArg$1 /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:boolean*/ = Boolean(tmpUnaryArg$1);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(`foo`)));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(!!((x = `foo`), $(x)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = `foo`;
const tmpUnaryArg$1 = $(x);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
