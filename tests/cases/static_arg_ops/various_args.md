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
const a /*:unknown*/ = $(100);
$(a);
const b /*:unknown*/ = $(100);
$(b);
const c /*:unknown*/ = $(100);
$(c);
const d /*:unknown*/ = $(100);
$(d);
$(-2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $( 100 );
$( b );
const c = $( 100 );
$( c );
const d = $( 100 );
$( d );
$( -2 );
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
