# Preval test case

# ignored_init_bool.md

> Type tracked > Ignored init bool
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

I actually don't know what side effect results in null that preval can't predict.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = 0;
if (imanumberandilovethrees) {
  itooamanumberjack = Boolean($(true));
} else {
  itooamanumberjack = Boolean($(false));
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````


## Settled


`````js filename=intro
const tmpBool /*:boolean*/ = Boolean(imanumberandilovethrees);
const tmpCalleeParam /*:unknown*/ = $(tmpBool);
imanumberandilovethrees;
const tmpClusterSSA_itooamanumberjack /*:boolean*/ = Boolean(tmpCalleeParam);
if (tmpCalleeParam) {
  $(`a`, tmpClusterSSA_itooamanumberjack);
} else {
  $(`b`, tmpClusterSSA_itooamanumberjack);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(Boolean(imanumberandilovethrees));
imanumberandilovethrees;
const tmpClusterSSA_itooamanumberjack = Boolean(tmpCalleeParam);
if (tmpCalleeParam) {
  $(`a`, tmpClusterSSA_itooamanumberjack);
} else {
  $(`b`, tmpClusterSSA_itooamanumberjack);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( imanumberandilovethrees );
const b = $( a );
imanumberandilovethrees;
const c = Boolean( b );
if (b) {
  $( "a", c );
}
else {
  $( "b", c );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

imanumberandilovethrees


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
