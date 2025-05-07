# Preval test case

# if-if-else-else-case.md

> Let hoisting > If-if-else-else-case
>
> This pattern is where a test condition is set, then conditionally updated, and checked again in a sub function.

This should end up something like this

```js
function f() {
  let test = $(1);
  const g = function () {
    const test2 = $(1);
    if (test2) {
      $('A');
      return undefined;
    } else {
      $('B');
      return undefined;
    }
  };
  if (test) {
    g();
    return undefined;
  } else {
    $('B');
    return undefined;
  }
}
if ($) f();
```

But it's

## Input

`````js filename=intro
function f() {
  let test = $(1);
  const g = function () {
    if (test) {
      $('A');
      return undefined;
    } else {
      $('B');
      return undefined;
    }
  };
  if (test) {
    test = $(1);
    g();
    return undefined;
  } else {
    g();
    return undefined;
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  const test /*:unknown*/ = $(1);
  if (test) {
    const tmpIfelseifelse /*:unknown*/ = $(1);
    if (tmpIfelseifelse) {
      $(`A`);
    } else {
      $(`B`);
    }
  } else {
    $(`B`);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  if ($(1)) {
    if ($(1)) {
      $(`A`);
    } else {
      $(`B`);
    }
  } else {
    $(`B`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 1 );
  if (a) {
    const b = $( 1 );
    if (b) {
      $( "A" );
    }
    else {
      $( "B" );
    }
  }
  else {
    $( "B" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
