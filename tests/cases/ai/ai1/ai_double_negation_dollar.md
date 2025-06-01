# Preval test case

# ai_double_negation_dollar.md

> Ai > Ai1 > Ai double negation dollar
>
> Test: Simplification of !!$('any_val') to a canonical boolean coercion.

## Input

`````js filename=intro
// Expected: const $$0 = $('any_val'); const $$1 = !!$$0; $('use', $$1);
let x = !!$('any_val');
$('use', x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg$1 /*:unknown*/ = $(`any_val`);
const x /*:boolean*/ = $boolean_constructor(tmpUnaryArg$1);
$(`use`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $boolean_constructor($(`any_val`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "any_val" );
const b = $boolean_constructor( a );
$( "use", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg$1 = $(`any_val`);
const tmpUnaryArg = !tmpUnaryArg$1;
let x = !tmpUnaryArg;
$(`use`, x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'any_val'
 - 2: 'use', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
