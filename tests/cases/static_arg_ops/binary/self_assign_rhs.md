# Preval test case

# self_assign_rhs.md

> Static arg ops > Binary > Self assign rhs
>
> When a function uses a param in the first statement and it is only called then we may be able to outline the first statement

## Input

`````js filename=intro
function f(a) {
  a = 1 + a;
  return a;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a = 1 + a;
  return a;
};
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a = 1 + a;
  return a;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`a`);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(true);
$(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
$(2);
$(3);
$(`1a`);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$( 3 );
$( "1a" );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: '1a'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
