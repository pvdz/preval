# Preval test case

# closure_inaccessible2.md

> Bool trampoline > Closure inaccessible2
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> In this case the closure x is inaccessible to the caller scope

## Input

`````js filename=intro
const obj = {
  f: () => {
    let x;
    const f = function() {
      x = $(100);
      const y = Boolean(x);
      return y;
    }
    $(x);
    return f;
  },
  g() {
    if (this.f()) $('pass');
    else $('fail');
  }
};
const f = obj.f();

// Prevent simple inlining
$(obj);

`````

## Pre Normal


`````js filename=intro
const obj = {
  f: () => {
    debugger;
    let x;
    const f$1 = function () {
      debugger;
      x = $(100);
      const y = Boolean(x);
      return y;
    };
    $(x);
    return f$1;
  },
  g() {
    const tmpPrevalAliasThis = this;
    debugger;
    if (tmpPrevalAliasThis.f()) $(`pass`);
    else $(`fail`);
  },
};
const f = obj.f();
$(obj);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  let x = undefined;
  const f$1 = function () {
    debugger;
    x = $(100);
    const y = Boolean(x);
    return y;
  };
  $(x);
  return f$1;
};
const obj = {
  f: tmpObjLitVal,
  g() {
    const tmpPrevalAliasThis = this;
    debugger;
    const tmpIfTest = tmpPrevalAliasThis.f();
    if (tmpIfTest) {
      $(`pass`);
      return undefined;
    } else {
      $(`fail`);
      return undefined;
    }
  },
};
const f = obj.f();
$(obj);
`````

## Output


`````js filename=intro
const f$1 = function () {
  debugger;
  const tmpssa2_x = $(100);
  const y /*:boolean*/ = Boolean(tmpssa2_x);
  return y;
};
const tmpObjLitVal = function () {
  debugger;
  $(undefined);
  return f$1;
};
const obj /*:object*/ = {
  f: tmpObjLitVal,
  g() {
    const tmpPrevalAliasThis /*:object*/ = this;
    debugger;
    const tmpIfTest = tmpPrevalAliasThis.f();
    if (tmpIfTest) {
      $(`pass`);
      return undefined;
    } else {
      $(`fail`);
      return undefined;
    }
  },
};
obj.f();
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 100 );
  const c = Boolean( b );
  return c;
};
const d = function() {
  debugger;
  $( undefined );
  return a;
};
const e = {
  f: d,
  g(  ) {
    const f = this;
    debugger;
    const g = f.f();
    if (g) {
      $( "pass" );
      return undefined;
    }
    else {
      $( "fail" );
      return undefined;
    }
  },
};
e.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { f: '"<function>"', g: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
