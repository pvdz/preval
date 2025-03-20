# Preval test case

# try_catch.md

> Arr mutation > Try catch
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try', blob.shift());
} catch {
  $('catch', blob.shift());
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:array*/ = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ = blob.shift();
  $(`catch`, tmpCalleeParam$1);
}
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const blob = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  $(`catch`, blob.shift());
}
$(`after`, blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 3 ];
try {
  $( "try", 1 );
}
catch (b) {
  const c = a.shift();
  $( "catch", c );
}
$( "after", a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'try', 1
 - 2: 'after', [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
