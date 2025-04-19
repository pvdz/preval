# Preval test case

# mutation_in_closure_proof.md

> Object literal > Prop write > Mutation in closure proof
>
> Contrived example of why the closure can be observable

## Input

`````js filename=intro
function f() { 
  $('a');
  if (x.y) {
    $('yeeting');
    delete x.y;
  }
  Object.defineProperty(x, 'y', {set(z) { }, get() { return 'intercepted'; }});
  $('b');
}
const x = {y: 0};
f();
x.y = 10;
f();
$(x);
$(x.y);
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`a`);
  const tmpIfTest /*:unknown*/ = x.y;
  if (tmpIfTest) {
    $(`yeeting`);
    delete x.y;
  } else {
  }
  const tmpCalleeParam /*:object*/ = {
    set($$0) {
      debugger;
      return undefined;
    },
    get() {
      debugger;
      return `intercepted`;
    },
  };
  $dotCall($Object_defineProperty, Object, `defineProperty`, x, `y`, tmpCalleeParam);
  $(`b`);
  return undefined;
};
const x /*:object*/ = { y: 0 };
f();
x.y = 10;
f();
$(x);
const tmpCalleeParam$1 /*:unknown*/ = x.y;
$(tmpCalleeParam$1);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`a`);
  if (x.y) {
    $(`yeeting`);
    delete x.y;
  }
  $dotCall($Object_defineProperty, Object, `defineProperty`, x, `y`, {
    set($$0) {},
    get() {
      return `intercepted`;
    },
  });
  $(`b`);
};
const x = { y: 0 };
f();
x.y = 10;
f();
$(x);
$(x.y);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  const b = c.y;
  if (b) {
    $( "yeeting" );
    delete c.y;
  }
  const d = {
    set( $$0 ) {
      debugger;
      return undefined;
    },
    get(  ) {
      debugger;
      return "intercepted";
    },
  };
  $dotCall( $Object_defineProperty, Object, "defineProperty", c, "y", d );
  $( "b" );
  return undefined;
};
const c = { y: 0 };
a();
c.y = 10;
a();
$( c );
const e = c.y;
$( e );
$( a );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_defineProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'a'
 - 4: 'yeeting'
 - 5: 'b'
 - 6: {}
 - 7: 'intercepted'
 - 8: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
