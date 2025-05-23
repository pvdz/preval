# Preval test case

# feat_known_global_object_is.md

> Normalize > Builtins > Typing > Feat known global object is

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof Object.is($spy('Object.is')));
`````


## Settled


`````js filename=intro
$spy(`Object.is`);
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(`Object.is`);
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$spy( "Object.is" );
$( "boolean" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Object_is;
const tmpMCP = $spy(`Object.is`);
const tmpUnaryArg = $dotCall(tmpMCF, $object_constructor, `is`, tmpMCP);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_is


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Object.is', 'Object.is']
 - 2: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
