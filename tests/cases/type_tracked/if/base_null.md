# Preval test case

# base_null.md

> Type tracked > If > Base null
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

#TODO

## Input

`````js filename=intro
const x = null;
if (x) {
  $('false');
} else {
  $('pass');
}
`````

## Pre Normal


`````js filename=intro
const x = null;
if (x) {
  $(`false`);
} else {
  $(`pass`);
}
`````

## Normalized


`````js filename=intro
const x = null;
if (x) {
  $(`false`);
} else {
  $(`pass`);
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
