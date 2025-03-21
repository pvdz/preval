# Preval test case

# base_return_cond.md

> Normalize > Loops > Base return cond
>
> A loop with a conditional early return

Theory crafting;

```js
// -->

function f2(n, r, v) {
  if (r === 1) {
    return v;
  } else {
    $('afterwards');
    return 100;
  }
}
function f() {
  let n = 0;
  let r = 1; // This is our loop condition; 0=break, 1: continue, 2: return v
  let v = undefined; // Only a placeholder, used if the body returns explicitly
  function body() {
    n = n + 1;
    if (n > 10) {
      // Note: we only transform the `return n`. This transform does not need to care about where the return appeared.
      r = 2; // "return"
      v = n; // the argument node
      return;
    }
    // The implicit end of the body is the same as a continue, and since r is still 1, we don't need to change anything
    return;
  }
  while (r) { // Explicitly not `r === 1` because normalization would want to abstract that again (but maybe that's ok?)
    body();
  }
  return f2(n, r, v);
}
f();
```

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $('n:', ++n);
    if (n > 10) {
      return n;
    }
  }
  $('afterwards');
  return 100;
}
$('f():', f());
`````


## Settled


`````js filename=intro
$(`n:`, 1);
$(`n:`, 2);
$(`n:`, 3);
$(`n:`, 4);
$(`n:`, 5);
$(`n:`, 6);
$(`n:`, 7);
$(`n:`, 8);
$(`n:`, 9);
$(`n:`, 10);
$(`n:`, 11);
$(`f():`, 11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`n:`, 1);
$(`n:`, 2);
$(`n:`, 3);
$(`n:`, 4);
$(`n:`, 5);
$(`n:`, 6);
$(`n:`, 7);
$(`n:`, 8);
$(`n:`, 9);
$(`n:`, 10);
$(`n:`, 11);
$(`f():`, 11);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "n:", 1 );
$( "n:", 2 );
$( "n:", 3 );
$( "n:", 4 );
$( "n:", 5 );
$( "n:", 6 );
$( "n:", 7 );
$( "n:", 8 );
$( "n:", 9 );
$( "n:", 10 );
$( "n:", 11 );
$( "f():", 11 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'n:', 1
 - 2: 'n:', 2
 - 3: 'n:', 3
 - 4: 'n:', 4
 - 5: 'n:', 5
 - 6: 'n:', 6
 - 7: 'n:', 7
 - 8: 'n:', 8
 - 9: 'n:', 9
 - 10: 'n:', 10
 - 11: 'n:', 11
 - 12: 'f():', 11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
