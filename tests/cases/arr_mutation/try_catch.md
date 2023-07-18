# Preval test case

# try_catch.md

> Arr mutation > Try catch
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try', blob.shift());
} catch {
  $('catch', blob.shift());
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = [1, 2, 3];
try {
  $(`try`, blob.shift());
} catch (e) {
  $(`catch`, blob.shift());
}
$(`after`, blob);
`````

## Normalized

`````js filename=intro
const blob = [1, 2, 3];
try {
  const tmpCallCallee = $;
  const tmpCalleeParam = `try`;
  const tmpCalleeParam$1 = blob.shift();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} catch (e) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = `catch`;
  const tmpCalleeParam$5 = blob.shift();
  tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
}
$(`after`, blob);
`````

## Output

`````js filename=intro
const blob = [2, 3];
try {
  $(`try`, 1);
} catch (e) {
  const tmpCalleeParam$1 = blob.shift();
  $(`catch`, tmpCalleeParam$1);
}
$(`after`, blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 2, 3,, ];
try {
  $( "try", 1 );
}
catch (e) {
  const b = a.shift();
  $( "catch", b );
}
$( "after", a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 'try', 1
 - 2: 'after', [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
