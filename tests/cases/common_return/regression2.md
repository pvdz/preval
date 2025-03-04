# Preval test case

# regression2.md

> Common return > Regression2
>
> This was working at some point and this was broken another point and hopefully when you're reading it it's working again

Note: `d` should be eliminated and inlined into the only call site, `c`

## Input

`````js filename=intro
const d = function (x) {
  if ($) {
    $('d');
    return x;
  } else {
    return x;
  }
};
const c = function () {
  $('c');
  return d($(10));
};
const b = function () {
  if ($) {
    $('b');
    return c();
  } else {
    return c();
  }
};
const a = function () {
  if ($) {
    $('a');
    return b();
  } else {
    return b();
  }
};
$(a());
`````

## Pre Normal


`````js filename=intro
const d = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    $(`d`);
    return x;
  } else {
    return x;
  }
};
const c = function () {
  debugger;
  $(`c`);
  return d($(10));
};
const b = function () {
  debugger;
  if ($) {
    $(`b`);
    return c();
  } else {
    return c();
  }
};
const a = function () {
  debugger;
  if ($) {
    $(`a`);
    return b();
  } else {
    return b();
  }
};
$(a());
`````

## Normalized


`````js filename=intro
const d = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    $(`d`);
    return x;
  } else {
    return x;
  }
};
const c = function () {
  debugger;
  $(`c`);
  const tmpCallCallee = d;
  const tmpCalleeParam = $(10);
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const b = function () {
  debugger;
  if ($) {
    $(`b`);
    const tmpReturnArg$1 = c();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = c();
    return tmpReturnArg$3;
  }
};
const a = function () {
  debugger;
  if ($) {
    $(`a`);
    const tmpReturnArg$5 = b();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = b();
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = a();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const c /*:()=>unknown*/ = function () {
  debugger;
  $(`c`);
  const tmpCalleeParam /*:unknown*/ = $(10);
  if ($) {
    $(`d`);
    return tmpCalleeParam;
  } else {
    return tmpCalleeParam;
  }
};
if ($) {
  $(`a`);
  if ($) {
    $(`b`);
    const tmpReturnArg$1 /*:unknown*/ = c();
    $(tmpReturnArg$1);
  } else {
    const tmpReturnArg$3 /*:unknown*/ = c();
    $(tmpReturnArg$3);
  }
} else {
  const tmpReturnArg$7 /*:unknown*/ = c();
  $(tmpReturnArg$7);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "c" );
  const b = $( 10 );
  if ($) {
    $( "d" );
    return b;
  }
  else {
    return b;
  }
};
if ($) {
  $( "a" );
  if ($) {
    $( "b" );
    const c = a();
    $( c );
  }
  else {
    const d = a();
    $( d );
  }
}
else {
  const e = a();
  $( e );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 10
 - 5: 'd'
 - 6: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
