# Preval test case

# spread.md

> Excessive args > Spread
>
> A spread can be eliminated if there is no param to receive it

#TODO

## Input

`````js filename=intro
const f = function () {
  $('a')
  $('a')
  $('a')
  $('a')
};
f(...xyz);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`a`);
  $(`a`);
  $(`a`);
};
f(...xyz);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`a`);
  $(`a`);
  $(`a`);
  return undefined;
};
f(...xyz);
`````

## Output


`````js filename=intro
[...xyz];
$(`a`);
$(`a`);
$(`a`);
$(`a`);
`````

## PST Output

With rename=true

`````js filename=intro
[ ... xyz ];
$( "a" );
$( "a" );
$( "a" );
$( "a" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

xyz

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
