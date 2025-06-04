# Preval test case

# multi_arg.md

> Math > Abs > Multi arg
>
> Various cases of Math.abbs

## Options

- globals: a b c

## Input

`````js filename=intro
$(Math.abs(-a, b, c));
`````


## Settled


`````js filename=intro
const tmpMCP /*:number*/ = -a;
b;
c;
b;
c;
const tmpCalleeParam /*:number*/ = $Math_abs(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = -a;
b;
c;
b;
c;
$($Math_abs(tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const d = -a;
b;
c;
b;
c;
const e = $Math_abs( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
const tmpMCP = -a;
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, tmpMCP, b, c);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
