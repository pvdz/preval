# Preval test case

# base_func.md

> Type tracked > If > Base func
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

#TODO

## Input

`````js filename=intro
const x = function() { $('fail'); };
if (x) {
  $('pass');
} else {
  $('false');
}
`````

## Pre Normal


`````js filename=intro
const x = function () {
  debugger;
  $(`fail`);
};
if (x) {
  $(`pass`);
} else {
  $(`false`);
}
`````

## Normalized


`````js filename=intro
const x = function () {
  debugger;
  $(`fail`);
  return undefined;
};
if (x) {
  $(`pass`);
} else {
  $(`false`);
}
`````

## Output


`````js filename=intro
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
