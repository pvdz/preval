# Preval test case

# try.md

> Arr mutation > Try
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
  $('try', blob.shift());
} catch {
}
$('after', blob)
`````

## Pre Normal

`````js filename=intro
const blob = [1, 2, 3];
try {
  $(`try`, blob.shift());
} catch {}
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
} catch {}
$(`after`, blob);
`````

## Output

`````js filename=intro
try {
  $(`try`, 1);
} catch {}
const blob = [2, 3];
$(`after`, blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'try', 1
 - 2: 'after', [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
