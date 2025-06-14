# Preval test case

# multi-nested-assignment-getset-computed-rhs-simple3.md

> Expr order > Multi-nested-assignment-getset-computed-rhs-simple3
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test whether any step can affect the value of `e` before it is used as the value to update all the properties.

## Input

`````js filename=intro
const objd = {
  get foo() {
    return 100;
  },
  set foo(a) {
    return 4000;
  },
};
const d = function () {
  $('a');
  $('b');
  return objd;
};
d();
function g(x) {
  $(x());
}
g(d);
`````


## Settled


`````js filename=intro
const d /*:()=>unknown*/ = function () {
  debugger;
  $(`a`);
  $(`b`);
  return undefined;
};
d();
d();
const objd /*:object*/ /*truthy*/ = {
  get foo() {
    debugger;
    return 100;
  },
  set foo($$0) {
    debugger;
    return 4000;
  },
};
$(objd);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const d = function () {
  $(`a`);
  $(`b`);
};
d();
d();
$({
  get foo() {
    return 100;
  },
  set foo($$0) {
    return 4000;
  },
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  $( "b" );
  return undefined;
};
a();
a();
const b = {
  get foo() {
    debugger;
    return 100;
  },
  set foo( $$0 ) {
    debugger;
    return 4000;
  },
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function ($$0) {
  let x = $$0;
  debugger;
  let tmpCalleeParam = x();
  $(tmpCalleeParam);
  return undefined;
};
const objd = {
  get foo() {
    debugger;
    return 100;
  },
  set foo($$0) {
    let a = $$0;
    debugger;
    return 4000;
  },
};
const d = function () {
  debugger;
  $(`a`);
  $(`b`);
  return objd;
};
d();
g(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'a'
 - 4: 'b'
 - 5: { foo: '<get/set>' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
