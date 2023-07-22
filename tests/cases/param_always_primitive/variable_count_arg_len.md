# Preval test case

# variable_count_arg_len.md

> Param always primitive > Variable count arg len
>
> When a function is always called with a certain primitive for a certain parameter then we can inline this safely in many cases.

This case explicitly uses `arguments.length` and has variable arg counts

#TODO

## Input

`````js filename=intro
function f(a, b, c, d) {
  if ($) {
    $(a, b, c, d, arguments.length, 'hopefully b is a literal afterwards');
  }
}
f(1, 2, 3, 'oops');
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  debugger;
  if ($) {
    $(a, b, c, d, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
  }
};
f(1, 2, 3, `oops`);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  debugger;
  if ($) {
    $(a, b, c, d, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 2, 3, `oops`);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## Output

`````js filename=intro
const f = function ($$0, $$1, $$2, $$3) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const a = $$0;
  const b = $$1;
  const c = $$2;
  const d = $$3;
  debugger;
  if ($) {
    $(a, b, c, d, tmpPrevalAliasArgumentsLen, `hopefully b is a literal afterwards`);
    return undefined;
  } else {
    return undefined;
  }
};
f(1, 2, 3, `oops`);
f(4, 2, 5);
f(6, 2, 7);
f(8, 2, 9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3 ) {
  const b = c.length;
  const d = e;
  const f = g;
  const h = i;
  const j = k;
  debugger;
  if ($) {
    $( d, f, h, j, b, "hopefully b is a literal afterwards" );
    return undefined;
  }
  else {
    return undefined;
  }
};
a( 1, 2, 3, "oops" );
a( 4, 2, 5 );
a( 6, 2, 7 );
a( 8, 2, 9 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, 3, 'oops', 4, 'hopefully b is a literal afterwards'
 - 2: 4, 2, 5, undefined, 3, 'hopefully b is a literal afterwards'
 - 3: 6, 2, 7, undefined, 3, 'hopefully b is a literal afterwards'
 - 4: 8, 2, 9, undefined, 3, 'hopefully b is a literal afterwards'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
