# Preval test case

# nested_getters_middle.md

> Normalize > Expressions > Nested getters middle
>
> Example of how getters and setters make the transform for `a=b.foo=c` non-trivial.

Using
```
function $(a) { console.log('->', a); return a }
```

The output ought to be

```
> f();
-------- start
-------- bound
-------- let 1
-> 3
-> 5
-------- test case
-> 5
-------- a
-> 2
-> 2
-------- a.foo
-> 3
-> 4
-------- a.foo = 4
```

## Input

`````js filename=intro
function f() {
    $('-------- start');
    const b = {
      get foo() {
        return $(2);
      }, set foo(x) {
        return $(3);
      },
    };
    $('-------- bound');
    let a = 1;
    $('-------- let 1');
    $(a = b.foo = 5);
    $('-------- test case');
    $(a); // 5 (!)
    $('-------- a');
    $(b.foo); // 2 (not 3!)
    $('-------- a.foo');
    $(b.foo = 4); // 4 (setter return value is ignored)
    $('-------- a.foo = 4');
}
f();
`````


## Settled


`````js filename=intro
$(`-------- start`);
$(`-------- bound`);
$(`-------- let 1`);
const b /*:object*/ /*truthy*/ = {
  get foo() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(2);
    return tmpReturnArg;
  },
  set foo($$0) {
    debugger;
    const tmpReturnArg$1 /*:unknown*/ = $(3);
    return tmpReturnArg$1;
  },
};
b.foo = 5;
$(5);
$(`-------- test case`);
$(5);
$(`-------- a`);
const tmpCalleeParam$1 /*:unknown*/ = b.foo;
$(tmpCalleeParam$1);
$(`-------- a.foo`);
b.foo = 4;
$(4);
$(`-------- a.foo = 4`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`-------- start`);
$(`-------- bound`);
$(`-------- let 1`);
const b = {
  get foo() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  },
  set foo($$0) {
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
  },
};
b.foo = 5;
$(5);
$(`-------- test case`);
$(5);
$(`-------- a`);
$(b.foo);
$(`-------- a.foo`);
b.foo = 4;
$(4);
$(`-------- a.foo = 4`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "-------- start" );
$( "-------- bound" );
$( "-------- let 1" );
const a = {
  get foo() {
    debugger;
    const b = $( 2 );
    return b;
  },
  set foo( $$0 ) {
    debugger;
    const c = $( 3 );
    return c;
  },
};
a.foo = 5;
$( 5 );
$( "-------- test case" );
$( 5 );
$( "-------- a" );
const d = a.foo;
$( d );
$( "-------- a.foo" );
a.foo = 4;
$( 4 );
$( "-------- a.foo = 4" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(`-------- start`);
  const b = {
    get foo() {
      debugger;
      const tmpReturnArg = $(2);
      return tmpReturnArg;
    },
    set foo($$0) {
      let x = $$0;
      debugger;
      const tmpReturnArg$1 = $(3);
      return tmpReturnArg$1;
    },
  };
  $(`-------- bound`);
  let a = 1;
  $(`-------- let 1`);
  const tmpNestedPropAssignRhs = 5;
  b.foo = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpCalleeParam = a;
  $(a);
  $(`-------- test case`);
  $(a);
  $(`-------- a`);
  let tmpCalleeParam$1 = b.foo;
  $(tmpCalleeParam$1);
  $(`-------- a.foo`);
  const tmpInitAssignLhsComputedRhs = 4;
  b.foo = tmpInitAssignLhsComputedRhs;
  let tmpCalleeParam$3 = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(`-------- a.foo = 4`);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '-------- start'
 - 2: '-------- bound'
 - 3: '-------- let 1'
 - 4: 3
 - 5: 5
 - 6: '-------- test case'
 - 7: 5
 - 8: '-------- a'
 - 9: 2
 - 10: 2
 - 11: '-------- a.foo'
 - 12: 3
 - 13: 4
 - 14: '-------- a.foo = 4'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
