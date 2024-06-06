# Preval test case

# and_32_neq_0_33.md

> Bit hacks > And > And 32 neq 0 33
>
> Not sure what's up

#TODO

## Input

`````js filename=intro
function f(x) {
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
$(f(33));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return `a`;
  } else {
    return `b`;
  }
};
$(f(33));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return `a`;
  } else {
    return `b`;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(33);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = $(10);
const b = $(20);
$(a, b);
$(`a`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
$( a, b );
$( "a" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 10, 20
 - 4: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
