# Preval test case

# recursion_problem_false.md

> Closures > Recursion problem false
>
> SSA and a function that refers to itself and gets overridden

It's a very contrived example. The point is that the init to f also contains a reference to f so if SSA changes the name, this must not break.

In this particular case, the function is immediately called (triggering the SSA condition).

I think we're saved by the fact that the read will be visited earlier than the var decl which correctly prevents this SSA case in the first place.

#TODO

## Input

`````js filename=intro
let f = function(bool) {
  // Since the rhs of an assignment is visited before the lhs, these references of `f` will
  // be found before the var decl. In that case, certain SSA hyper optimizations are skipped.
  if (bool) {
    $(1, 'true');
    return f;
  } else {
    f = function(){ return () => $(2, 'false'); }
    return f;
  }
};
// No SSA here
f = f(false);
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let bool = $$0;
  debugger;
  if (bool) {
    $(1, `true`);
    return f;
  } else {
    f = function () {
      debugger;
      return () => {
        debugger;
        return $(2, `false`);
      };
    };
    return f;
  }
};
f = f(false);
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let bool = $$0;
  debugger;
  if (bool) {
    $(1, `true`);
    return f;
  } else {
    f = function () {
      debugger;
      const tmpReturnArg = function () {
        debugger;
        const tmpReturnArg$1 = $(2, `false`);
        return tmpReturnArg$1;
      };
      return tmpReturnArg;
    };
    return f;
  }
};
f = f(false);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpReturnArg = function () {
  debugger;
  const tmpReturnArg$1 = $(2, `false`);
  return tmpReturnArg$1;
};
let f = function ($$0) {
  const bool = $$0;
  debugger;
  if (bool) {
    $(1, `true`);
    return f;
  } else {
    f = function () {
      debugger;
      return tmpReturnArg;
    };
    return f;
  }
};
f = f(false);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2, "false" );
  return b;
};
let c = function($$0 ) {
  const d = e;
  debugger;
  if (d) {
    $( 1, "true" );
    return c;
  }
  else {
    c = function() {
      debugger;
      return a;
    };
    return c;
  }
};
c = c( false );
const f = c();
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
