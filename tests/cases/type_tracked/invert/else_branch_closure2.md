# Preval test case

# else_branch_closure2.md

> Type tracked > Invert > Else branch closure2
>
> If you create a closure in the else branch then the closure must always be the falsy value...

Just wanted an eval test to cover this case to make sure

## Input

`````js filename=intro
function f(y) {
  const x = '' + y;
  if (x) {
  } else {
    const g = function(z) {
      $('keepme');
      return [x, z];
    }
    $(g(10), 'pass');
    $(g(20), 'pass');
  }
}
f('');
f('foop');
`````


## Settled


`````js filename=intro
const f /*:(string)=>undefined*/ = function ($$0) {
  const y /*:string*/ = $$0;
  debugger;
  const g /*:(number)=>array*/ = function ($$0) {
    const z /*:number*/ = $$0;
    debugger;
    $(`keepme`);
    const tmpReturnArg /*:array*/ = [y, z];
    return tmpReturnArg;
  };
  if (y) {
    return undefined;
  } else {
    const tmpCalleeParam /*:array*/ = g(10);
    $(tmpCalleeParam, `pass`);
    const tmpCalleeParam$1 /*:array*/ = g(20);
    $(tmpCalleeParam$1, `pass`);
    return undefined;
  }
};
f(``);
f(`foop`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (y) {
  const g = function (z) {
    $(`keepme`);
    const tmpReturnArg = [y, z];
    return tmpReturnArg;
  };
  if (!y) {
    $(g(10), `pass`);
    $(g(20), `pass`);
  }
};
f(``);
f(`foop`);
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
    const e = [ b, d ];
    return e;
  };
  if (b) {
    return undefined;
  }
  else {
    const f = c( 10 );
    $( f, "pass" );
    const g = c( 20 );
    $( g, "pass" );
    return undefined;
  }
};
a( "" );
a( "foop" );
`````


## Todos triggered


- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'keepme'
 - 2: ['', 10], 'pass'
 - 3: 'keepme'
 - 4: ['', 20], 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
