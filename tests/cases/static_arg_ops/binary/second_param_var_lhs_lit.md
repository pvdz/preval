# Preval test case

# second_param_var_lhs_lit.md

> Static arg ops > Binary > Second param var lhs lit
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a, b) {
  const x = b + 1;
  return x + a;
}

$(f(1, 2));
$(f(2, 100));
$(f('a', 'x'));
$(f(true, false));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const x = b + 1;
  return x + a;
};
$(f(1, 2));
$(f(2, 100));
$(f(`a`, `x`));
$(f(true, false));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const x = b + 1;
  const tmpReturnArg = x + a;
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1, 2);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2, 100);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(`a`, `x`);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(true, false);
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
$(4);
$(103);
$(`x1a`);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 4 );
$( 103 );
$( "x1a" );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - 2: 103
 - 3: 'x1a'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
