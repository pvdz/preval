# Preval test case

# string_replace_regex_obj_func.md

> Type tracked > String method > String replace regex obj func
>
> This is an exotic case, targeting a specific obfuscation, but also a proof of concept that this can be done.
> It'll be harder to come up with generic solutions for these kinds of cases.

## Input

`````js filename=intro
const obj = {a: 1, b: 2, ' ': '->'};
const rex = /\b.\b/g;
$('a is not b'.replace(rex, (c) => obj[c]));
`````

## Settled


`````js filename=intro
$(`1->is->not->2`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1->is->not->2`);
`````

## Pre Normal


`````js filename=intro
const obj = { a: 1, b: 2, [` `]: `->` };
const rex = /\b.\b/g;
$(
  `a is not b`.replace(rex, ($$0) => {
    let c = $$0;
    debugger;
    return obj[c];
  }),
);
`````

## Normalized


`````js filename=intro
const obj = { a: 1, b: 2, [` `]: `->` };
const rex = /\b.\b/g;
const tmpCalleeParam$1 = rex;
const tmpCalleeParam$3 = function ($$0) {
  let c = $$0;
  debugger;
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
const tmpCalleeParam = `a is not b`.replace(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "1->is->not->2" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1->is->not->2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
