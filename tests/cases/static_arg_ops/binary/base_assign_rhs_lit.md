# Preval test case

# base_assign_rhs_lit.md

> Static arg ops > Binary > Base assign rhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
let y
function f(a) {
  y = 1 + a;
  return $(100);
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
$(y);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  y = 1 + a;
  return $(100);
};
let y;
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
$(y);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  y = 1 + a;
  const tmpReturnArg = $(100);
  return tmpReturnArg;
};
let y = undefined;
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`a`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(true);
$(tmpCalleeParam$5);
$(y);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = $(100);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $(100);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = $(100);
$(tmpCalleeParam$5);
$(2);
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
$( 2 );
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
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
