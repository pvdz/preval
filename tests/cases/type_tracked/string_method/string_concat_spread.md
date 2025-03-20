# Preval test case

# string_concat_spread.md

> Type tracked > String method > String concat spread

## Input

`````js filename=intro
const x = 'foo'.concat(a, ...b); // the spread prevents changing into a template
$(x);
`````


## Settled


`````js filename=intro
const x /*:string*/ = `foo`.concat(a, ...b);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`.concat(a, ...b));
`````


## PST Settled
With rename=true

`````js filename=intro
const c = "foo".concat( a, ...b );
$( c );
`````


## Todos triggered


- Maybe support type tracked trick of string.concat with spread


## Globals


BAD@! Found 2 implicit global bindings:

a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
