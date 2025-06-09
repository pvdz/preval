# Preval test case

# string_concat_to_tpl.md

> Type tracked > String method > String concat to tpl

This should become a template

## Options

- globals: a b

## Input

`````js filename=intro
const x = 'foo'.concat(a, b); // `foo${a}${b}`
$(x);
`````


## Settled


`````js filename=intro
const x /*:string*/ /*truthy*/ = `foo${a}${b}`;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_concat;
const x = $dotCall($string_concat, `foo`, `concat`, a, b);
$(x);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None (except for the 2 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
