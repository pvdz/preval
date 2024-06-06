# Preval test case

# feat_first_statement.md

> Tofix > Feat first statement
>
> When a function uses a param in the first statement and it 
> is only called then we may be able to outline the first statement

exsting test

## Input

`````js filename=intro
let y
function f(a) {
  y = ~a;
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
  y = ~a;
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
  y = ~a;
  const tmpReturnArg = $(100);
  return tmpReturnArg;
};
let y = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(`a`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(true);
tmpCallCallee$5(tmpCalleeParam$5);
$(y);
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const tmpOutlinedParam = $$0;
  debugger;
  y = tmpOutlinedParam;
  const tmpReturnArg = $(100);
  return tmpReturnArg;
};
let y = undefined;
const tmpCalleeParam = f(-2);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(-3);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(-1);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(-2);
$(tmpCalleeParam$5);
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
