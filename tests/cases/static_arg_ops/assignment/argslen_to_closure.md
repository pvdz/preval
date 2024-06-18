# Preval test case

# argslen_to_closure.md

> Static arg ops > Assignment > Argslen to closure
>
> This was detected as closure to closure

## Input

`````js filename=intro

function f(a) { if (a) return $(1); else return $(2); }
const one = f(10);
const two = f(20);
$(one, two);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  if (a) return $(1);
  else return $(2);
};
const one = f(10);
const two = f(20);
$(one, two);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  if (a) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
};
const one = f(10);
const two = f(20);
$(one, two);
`````

## Output


`````js filename=intro
const one = $(1);
const two = $(1);
$(one, two);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
