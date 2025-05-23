# Preval test case

# base_call2.md

> Return param > Base call2
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
const f = function () {
  $('no');
  $('inlining');
  $('please');
  return undefined;
};
undefined;
f();
$('pass');
$(undefined);
undefined;
f();
const tmpCalleeParam$3 = 2();
$(tmpCalleeParam$3);
undefined;
f();
const tmpCalleeParam$5 = 'three'();
$(tmpCalleeParam$5);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`pass`);
$(undefined);
f();
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`);
  $(`inlining`);
  $(`please`);
};
f();
$(`pass`);
$(undefined);
f();
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( "pass" );
$( undefined );
a();
throw "[Preval] Attempting to call a value that cannot be called: `const tmpCalleeParam$3 = 2();`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`pass`);
$(undefined);
f();
throw `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``;
const tmpCalleeParam$5 = 0;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass'
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
