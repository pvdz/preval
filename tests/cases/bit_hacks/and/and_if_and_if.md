# Preval test case

# and_if_and_if.md

> Bit hacks > And > And if and if
>
> Combine two checked ands

## Input

`````js filename=intro
function f(a) {
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $('pass');
    }
  }
}

$(f(1));
$(f(2));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
    }
  }
};
$(f(1));
$(f(2));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a & 1;
  if (x) {
    const y = a & 4;
    if (y) {
      $(`pass`);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
