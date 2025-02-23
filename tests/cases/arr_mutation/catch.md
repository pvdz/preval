# Preval test case

# catch.md

> Arr mutation > Catch
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try');
} catch (e) {
  $('catch', blob.shift());
}
$('after', blob)
`````

## Pre Normal


`````js filename=intro
const blob = [1, 2, 3];
try {
  $(`try`);
} catch (e) {
  $(`catch`, blob.shift());
}
$(`after`, blob);
`````

## Normalized


`````js filename=intro
const blob = [1, 2, 3];
try {
  $(`try`);
} catch (e) {
  const tmpCallCallee = $;
  const tmpCalleeParam = `catch`;
  const tmpCalleeParam$1 = blob.shift();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
}
$(`after`, blob);
`````

## Output


`````js filename=intro
const blob /*:array*/ = [1, 2, 3];
try {
  $(`try`);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ = blob.shift();
  $(`catch`, tmpCalleeParam$1);
}
$(`after`, blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
try {
  $( "try" );
}
catch (b) {
  const c = a.shift();
  $( "catch", c );
}
$( "after", a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'try'
 - 2: 'after', [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
