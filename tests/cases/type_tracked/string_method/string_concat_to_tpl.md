# Preval test case

# string_concat_to_tpl.md

> Type tracked > String method > String concat to tpl

This should become a template

## Input

`````js filename=intro
const x = 'foo'.concat(a, b); // `foo${a}${b}`
$(x);
`````


## Settled


`````js filename=intro
const x /*:string*/ = `foo${a}${b}`;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo${a}${b}`);
`````


## PST Settled
With rename=true

`````js filename=intro
const c = `foo${a}${b}`;
$( c );
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


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
