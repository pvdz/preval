# Preval test case

# ignored_init_string.md

> Type tracked > Ignored init string
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = false;
if (imanumberandilovethrees) {
  itooamanumberjack = String($(1));
} else {
  itooamanumberjack = String($(2));
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````


## Settled


`````js filename=intro
let itooamanumberjack /*:string*/ /*ternaryConst*/ = ``;
if (imanumberandilovethrees) {
  const tmpCalleeParam /*:unknown*/ = $(1);
  itooamanumberjack = $coerce(tmpCalleeParam, `string`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  itooamanumberjack = $coerce(tmpCalleeParam$1, `string`);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let itooamanumberjack = ``;
if (imanumberandilovethrees) {
  itooamanumberjack = $coerce($(1), `string`);
} else {
  itooamanumberjack = $coerce($(2), `string`);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "";
if (imanumberandilovethrees) {
  const b = $( 1 );
  a = $coerce( b, "string" );
}
else {
  const c = $( 2 );
  a = $coerce( c, "string" );
}
if (a) {
  $( "a", a );
}
else {
  $( "b", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  let tmpCalleeParam = $(1);
  itooamanumberjack = $coerce(tmpCalleeParam, `string`);
} else {
  let tmpCalleeParam$1 = $(2);
  itooamanumberjack = $coerce(tmpCalleeParam$1, `string`);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
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
