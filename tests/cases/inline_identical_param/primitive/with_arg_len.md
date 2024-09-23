# Preval test case

# with_arg_len.md

> Inline identical param > Primitive > With arg len
>
> When a function is always called with a certain primitive for a certain parameter then we can inline this safely in many cases.

In this case the param can also be eliminated. But that's not always possible, like with `arguments.length` (unless that is also replaced with the actual count).

## Input

`````js filename=intro
function f(a, b, c) {
  if ($) {
    $(a, b, c, arguments.length, 'hopefully b is a literal afterwards');
  }
}
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  if ($) {
    $(a, b, c, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
  }
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  if ($) {
    $(a, b, c, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 2, 3);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Output


`````js filename=intro
const f /*:(number, number)=>undefined*/ = function ($$0, $$1) {
  const a /*:number*/ = $$0;
  const c /*:number*/ = $$1;
  debugger;
  if ($) {
    $(a, 2, c, 3, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 3);
f(4, 5);
f(6, 7);
f(8, 9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  const d = e;
  debugger;
  if ($) {
    $( b, 2, d, 3, "hopefully b is a literal afterwards" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1, 3 );
a( 4, 5 );
a( 6, 7 );
a( 8, 9 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, 3, 3, 'hopefully b is a literal afterwards'
 - 2: 4, 2, 5, 3, 'hopefully b is a literal afterwards'
 - 3: 6, 2, 7, 3, 'hopefully b is a literal afterwards'
 - 4: 8, 2, 9, 3, 'hopefully b is a literal afterwards'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
