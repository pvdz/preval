# Preval test case

# various_args.md

> Static arg ops > Various args
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
const f = function ($$0) {
  const a = $$0;
  debugger;
  y = ~a;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(1);
$(a);
const b = f(2);
$(b);
const c = f(`a`);
$(c);
const d = f(true);
$(d);
$(y);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const a$1 = $dlr_$$0;
  y = ~a$1;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(1);
$(a);
const b = f(2);
$(b);
const c = f(`a`);
$(c);
const d = f(true);
$(d);
$(y);
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const a$1 = $dlr_$$0;
  y = ~a$1;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(1);
$(a);
const b = f(2);
$(b);
const c = f(`a`);
$(c);
const d = f(true);
$(d);
$(y);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpOutlinedParam = $$0;
  debugger;
  y = tmpOutlinedParam;
  const r = $(100);
  return r;
};
let y = undefined;
const a = f(-2);
$(a);
const b = f(-3);
$(b);
const c = f(-1);
$(c);
const d = f(-2);
$(d);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  d = b;
  const e = $( 100 );
  return e;
};
let d = undefined;
const f = a( -2 );
$( f );
const g = a( -3 );
$( g );
const h = a( -1 );
$( h );
const i = a( -2 );
$( i );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: -2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
