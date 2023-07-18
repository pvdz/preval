# Preval test case

# string_spy.md

> Array > Static context > String spy
>
> Trying to break the String([1,2,3]) trick

#TODO

## Input

`````js filename=intro
function f() {
  $('updating');
  arr[0] = 'pass';
}
const arr = ['fail', 2, 3];
f();
f();
$(String(arr));
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`updating`);
  arr[0] = `pass`;
};
const arr = [`fail`, 2, 3];
f();
f();
$(String(arr));
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`updating`);
  arr[0] = `pass`;
  return undefined;
};
const arr = [`fail`, 2, 3];
f();
f();
const tmpCallCallee = $;
const tmpStringFirstArg = arr;
const tmpCalleeParam = $coerce(tmpStringFirstArg, `string`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $(`updating`);
  arr[0] = `pass`;
  return undefined;
};
const arr = [`fail`, 2, 3];
f();
f();
const tmpCalleeParam = $coerce(arr, `string`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "updating" );
  b[0] = "pass";
  return undefined;
},;
const b = [ "fail", 2, 3,, ];
a();
a();
const c = $coerce( b, "string" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'updating'
 - 2: 'updating'
 - 3: 'pass,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
