# Preval test case

# base_true.md

> Type tracked > If > Base true
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

#TODO

## Input

`````js filename=intro
const x = true;
if (x) {
  $('false');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const x = true;
if (x) {
  $(`false`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const x = true;
if (x) {
  $(`false`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
$(`false`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "false" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
