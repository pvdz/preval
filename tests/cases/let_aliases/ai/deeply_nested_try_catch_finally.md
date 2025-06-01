# Preval test case

# deeply_nested_try_catch_finally.md

> Let aliases > Ai > Deeply nested try catch finally
>
> Deeply nested try/catch/finally with multiple mutations (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  try {
    if ($("cond")) {
      x = "changed1";
    } else {
      x = "changed2";
    }
  } catch (e) {
    x = "catch";
  } finally {
    if ($("cond2")) {
      x = "finally1";
    }
  }
} catch (e) {
  x = "outer";
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
try {
  try {
    const tmpIfTest /*:unknown*/ = $(`cond`);
    if (tmpIfTest) {
      x = `changed1`;
    } else {
      x = `changed2`;
    }
  } catch (e) {
    x = `catch`;
  }
  const tmpIfTest$1 /*:unknown*/ = $(`cond2`);
  if (tmpIfTest$1) {
    x = `finally1`;
  } else {
  }
} catch (e$1) {
  x = `outer`;
}
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  try {
    if ($(`cond`)) {
      x = `changed1`;
    } else {
      x = `changed2`;
    }
  } catch (e) {
    x = `catch`;
  }
  if ($(`cond2`)) {
    x = `finally1`;
  }
} catch (e$1) {
  x = `outer`;
}
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
try {
  try {
    const c = $( "cond" );
    if (c) {
      a = "changed1";
    }
    else {
      a = "changed2";
    }
  }
  catch (d) {
    a = "catch";
  }
  const e = $( "cond2" );
  if (e) {
    a = "finally1";
  }
}
catch (f) {
  a = "outer";
}
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    const tmpIfTest = $(`cond`);
    if (tmpIfTest) {
      x = `changed1`;
    } else {
      x = `changed2`;
    }
  } catch (e) {
    try {
      x = `catch`;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  const tmpIfTest$1 = $(`cond2`);
  if (tmpIfTest$1) {
    x = `finally1`;
  } else {
  }
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
  }
} catch (e$1) {
  x = `outer`;
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'cond'
 - 3: 'cond2'
 - 4: 'val', 'finally1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
