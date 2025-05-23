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
  const tmpMCP /*:object*/ = {
    set($$0) {
      debugger;
      return undefined;
    },
    get() {
      debugger;
      return `intercepted`;
    },
  };
  $Object_defineProperty(x, `y`, tmpMCP);
  $(`b`);
  return undefined;
};
const x /*:object*/ = { y: 0 };
f();
x.y = 10;
f();
$(x);
const tmpCalleeParam /*:unknown*/ = x.y;
$(tmpCalleeParam);
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
  $Object_defineProperty(x, `y`, {
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
  $Object_defineProperty( c, "y", d );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(`a`);
  const tmpIfTest = x.y;
  if (tmpIfTest) {
    $(`yeeting`);
    delete x.y;
  } else {
  }
  const tmpMCF = $Object_defineProperty;
  const tmpMCP = {
    set($$0) {
      let z = $$0;
      debugger;
      return undefined;
    },
    get() {
      debugger;
      return `intercepted`;
    },
  };
  $dotCall(tmpMCF, $object_constructor, `defineProperty`, x, `y`, tmpMCP);
  $(`b`);
  return undefined;
};
const x = { y: 0 };
f();
x.y = 10;
f();
$(x);
let tmpCalleeParam = x.y;
$(tmpCalleeParam);
$(f);
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
