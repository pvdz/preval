# Preval test case

# try_catch.md

> Obj mutation > Try catch
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
  blob.thing = 'boing';
} catch {
  blob.thing = 'boom';
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:object*/ /*truthy*/ = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
try {
  a.thing = "boing";
}
catch (b) {
  a.thing = "boom";
}
$( "after", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const blob = { thing: `woop` };
try {
  blob.thing = `boing`;
} catch (e) {
  blob.thing = `boom`;
}
$(`after`, blob);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after', { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
