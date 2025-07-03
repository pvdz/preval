# Preval test case

# feat_known_global_parsefloat.md

> Normalize > Builtins > Typing > Feat known global parsefloat
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof parseFloat($spy('parseFloat')));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$1, `string`);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String($spy(`parseFloat`));
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "parseFloat" );
$coerce( a, "string" );
$( "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $spy(`parseFloat`);
const tmpUnaryArg = $Number_parseFloat(tmpCalleeParam$1);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseFloat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['parseFloat', 'parseFloat']
 - 2: '$spy[1].toString()', 'parseFloat'
 - 3: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
