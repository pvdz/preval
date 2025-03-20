# Preval test case

# catch.md

> Obj mutation > Catch
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
try {
  $('try');
} catch {
  blob.thing = 'boing';
  $('catch');
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:object*/ = { thing: `woop` };
try {
  $(`try`);
} catch (e) {
  blob.thing = `boing`;
  $(`catch`);
}
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = { thing: `woop` };
try {
  $(`try`);
} catch (e) {
  blob.thing = `boing`;
  $(`catch`);
}
$(`after`, blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "woop" };
try {
  $( "try" );
}
catch (b) {
  a.thing = "boing";
  $( "catch" );
}
$( "after", a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try'
 - 2: 'after', { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
