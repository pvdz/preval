# Preval test case

# else_branch_closure.md

> Type tracked > Invert > Else branch closure
>
> If you create a closure in the else branch then the closure must always be the falsy value...

Just wanted an eval test to cover this case to make sure

## Input

`````js filename=intro
function f(y) {
  const x = '' + y;
  if (x) {
    $(x, 'if');
  } else {
    const f = function(z) {
      $('keepme');
      $('keepme');
      // This must always be an empty string, regardless of y, right?
      // So a rule should be able to replace the occurrence of `x` with an empty string safely...
      return [x, z];
    }
    $(f(10), 'pass');
    $(f(20), 'pass');
  }
}
f($(''));
f($('foop'));
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>undefined*/ = function ($$0) {
  const y /*:unknown*/ = $$0;
  debugger;
  const f$1 /*:(number)=>array*/ = function ($$0) {
    const z /*:number*/ = $$0;
    debugger;
    $(`keepme`);
    $(`keepme`);
    const tmpReturnArg /*:array*/ /*truthy*/ = [x, z];
    return tmpReturnArg;
  };
  const x /*:string*/ = $coerce(y, `plustr`);
  if (x) {
    $(x, `if`);
    return undefined;
  } else {
    const tmpCalleeParam /*:array*/ /*truthy*/ = f$1(10);
    $(tmpCalleeParam, `pass`);
    const tmpCalleeParam$1 /*:array*/ /*truthy*/ = f$1(20);
    $(tmpCalleeParam$1, `pass`);
    return undefined;
  }
};
const tmpCalleeParam$3 /*:unknown*/ = $(``);
f(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = $(`foop`);
f(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (y) {
  const f$1 = function (z) {
    $(`keepme`);
    $(`keepme`);
    const tmpReturnArg = [x, z];
    return tmpReturnArg;
  };
  const x = $coerce(y, `plustr`);
  if (x) {
    $(x, `if`);
  } else {
    $(f$1(10), `pass`);
    $(f$1(20), `pass`);
  }
};
f($(``));
f($(`foop`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = function($$0 ) {
    const d = $$0;
    debugger;
    $( "keepme" );
    $( "keepme" );
    const e = [ f, d ];
    return e;
  };
  const f = $coerce( b, "plustr" );
  if (f) {
    $( f, "if" );
    return undefined;
  }
  else {
    const g = c( 10 );
    $( g, "pass" );
    const h = c( 20 );
    $( h, "pass" );
    return undefined;
  }
};
const i = $( "" );
a( i );
const j = $( "foop" );
a( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = $coerce(y, `plustr`);
  if (x) {
    $(x, `if`);
    return undefined;
  } else {
    const f$1 = function ($$0) {
      let z = $$0;
      debugger;
      $(`keepme`);
      $(`keepme`);
      const tmpReturnArg = [x, z];
      return tmpReturnArg;
    };
    let tmpCalleeParam = f$1(10);
    $(tmpCalleeParam, `pass`);
    let tmpCalleeParam$1 = f$1(20);
    $(tmpCalleeParam$1, `pass`);
    return undefined;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = $(``);
f(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = $(`foop`);
f(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - 2: 'keepme'
 - 3: 'keepme'
 - 4: ['', 10], 'pass'
 - 5: 'keepme'
 - 6: 'keepme'
 - 7: ['', 20], 'pass'
 - 8: 'foop'
 - 9: 'foop', 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
