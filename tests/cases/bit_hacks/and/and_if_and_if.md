# Preval test case

# and_if_and_if.md

> Bit hacks > And > And if and if
>
> Combine two checked ands

#TODO

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
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(2);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($$0, $$1) {
  const a = $$0;
  const tmpOutlinedParam = $$1;
  debugger;
  if (tmpOutlinedParam) {
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
f(1, 1);
$(undefined);
f(2, 0);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  const d = e;
  debugger;
  if (d) {
    const f = b & 4;
    if (f) {
      $( "pass" );
      return undefined;
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
},;
a( 1, 1 );
$( undefined );
a( 2, 0 );
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
