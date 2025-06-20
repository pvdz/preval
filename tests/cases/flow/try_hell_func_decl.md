# Preval test case

# try_hell_func_decl.md

> Flow > Try hell func decl
>
> This is why we don't properly analyze the try/catch/finally for mutation state. And this is just the tip of the ice berg. No thank you.

## Input

`````js filename=intro

{
  let x = 0;
  function f() {
    stop: try {
      x = 1;
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  $(x);
}

{
  let x = 0;
  function f() {
    stop: try {
      throw 'one';
    } catch {
      x = 2;
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  $(x);
}
`````


## Settled


`````js filename=intro
try {
  throw `one`;
} catch (e) {}
$(1);
try {
  throw `one`;
} catch (e$3) {}
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {}
$(1);
try {
  throw `one`;
} catch (e$3) {}
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {

}
$( 1 );
try {
  throw "one";
}
catch (b) {

}
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  try {
    x = 1;
    throw `one`;
  } catch (e) {
    try {
      $finalStep = true;
      $finalArg = `two`;
      return undefined;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return undefined;
};
let x = 0;
f();
$(x);
let f$1 = function () {
  debugger;
  let $implicitThrow$1 = false;
  let $finalStep$1 = false;
  let $finalCatchArg$1 = undefined;
  let $finalArg$1 = undefined;
  try {
    throw `one`;
  } catch (e$1) {
    try {
      x$1 = 2;
      $finalStep$1 = true;
      $finalArg$1 = `two`;
      return undefined;
    } catch ($finalImplicit$1) {
      $implicitThrow$1 = true;
      $finalCatchArg$1 = $finalImplicit$1;
    }
  }
  return undefined;
};
let x$1 = 0;
f$1();
$(x$1);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
