# Preval test case

# builtin_init_too_many_args.md

> Normalize > Call > Builtin init too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
const x = isNaN($spy('a'), $spy('b'), $spy('c'));
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(`a`);
$spy(`b`);
$spy(`c`);
const x /*:boolean*/ = isNaN(tmpCalleeParam);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $spy(`a`);
$spy(`b`);
$spy(`c`);
$(isNaN(tmpCalleeParam));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$spy( "c" );
const b = isNaN( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy(`a`);
let tmpCalleeParam$1 = $spy(`b`);
let tmpCalleeParam$3 = $spy(`c`);
const tmpCompObj = [tmpCalleeParam];
const tmpArgOverflow = tmpCalleeParam;
const x = isNaN(tmpCalleeParam);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - 4: '$spy[1].valueOf()', 'a'
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
