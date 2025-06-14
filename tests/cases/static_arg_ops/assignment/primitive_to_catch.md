# Preval test case

# primitive_to_catch.md

> Static arg ops > Assignment > Primitive to catch
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function() {
    e = 1;
    $('filler');
    $('more filler');
    return
  }
  $(f());
  $(f());
}
`````


## Settled


`````js filename=intro
try {
  $();
} catch (e) {
  const f /*:()=>unknown*/ = function () {
    debugger;
    e = 1;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f();
  $(undefined);
  f();
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function () {
    e = 1;
    $(`filler`);
    $(`more filler`);
  };
  f();
  $(undefined);
  f();
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $();
}
catch (a) {
  const b = function() {
    debugger;
    a = 1;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  b();
  $( undefined );
  b();
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function () {
    debugger;
    e = 1;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
  let tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
