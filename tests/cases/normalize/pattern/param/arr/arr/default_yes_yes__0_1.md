# Preval test case

# default_yes_yes__0_1.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  0 1
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(tmp) {
  [] = tmp
  return 'bad';
}
f(true);
`````

## Settled


`````js filename=intro
[...true];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...true];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let tmp = $$0;
  debugger;
  [] = tmp;
  return `bad`;
};
f(true);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let tmp = $$0;
  debugger;
  const arrAssignPatternRhs = tmp;
  const arrPatternSplat = [...arrAssignPatternRhs];
  return `bad`;
};
f(true);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...true ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
