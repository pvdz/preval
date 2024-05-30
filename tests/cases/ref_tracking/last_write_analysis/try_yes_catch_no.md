# Preval test case

# try_yes_catch_no.md

> Ref tracking > Last write analysis > Try yes catch no
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
// Can rename this write since only the next read can observe it
const oops = function(){ if ($) throw "oops"; };
let x = $('a');
$(x);
// Can not SSA this
x = $('b');
try {
  x = $('c');
} catch {
  $('fail');
}
$(x);
`````

## Pre Normal

`````js filename=intro
const oops = function () {
  debugger;
  if ($) throw `oops`;
};
let x = $(`a`);
$(x);
x = $(`b`);
try {
  x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(x);
`````

## Normalized

`````js filename=intro
const oops = function () {
  debugger;
  if ($) {
    throw `oops`;
  } else {
    return undefined;
  }
};
let x = $(`a`);
$(x);
x = $(`b`);
try {
  x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
try {
  x = $(`c`);
} catch (e) {
  $(`fail`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "a" );
$( a );
a = $( "b" );
try {
  a = $( "c" );
}
catch (e) {
  $( "fail" );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'c'
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
