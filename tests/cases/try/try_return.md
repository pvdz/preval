# Preval test case

# try_return.md

> Try > Try return
>
>

## Input

`````js filename=intro
function f() {
  try {
    return NaN;
  } catch {
    $('unreachable');
  }
  $('also unreachable');
}
$('end', f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  try {
    return NaN;
  } catch (e) {
    $(`unreachable`);
  }
  $(`also unreachable`);
};
$(`end`, f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
$(`end`, f);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  return NaN;
};
$(`end`, f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return NaN;
};
$( "end", a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'end', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
