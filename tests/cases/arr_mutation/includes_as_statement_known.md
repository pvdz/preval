# Preval test case

# includes_as_statement_known.md

> Arr mutation > Includes as statement known

## Options

- globals: a b c

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.includes(a, b, c);
$(arr.length);
`````


## Settled


`````js filename=intro
a;
$coerce(b, `number`);
c;
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a;
$coerce(b, `number`);
c;
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
a;
$coerce( b, "number" );
c;
$( 3 );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_includes
- (todo) arr mutation may be able to inline this method: tmpMCF


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
