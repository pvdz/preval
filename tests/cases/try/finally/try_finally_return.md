# Preval test case

# try_finally_return.md

> Try > Finally > Try finally return
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
function f() {
  try {
    throw 'exit';
  } finally {
    $(2);
  }
}
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
    throw `exit`;
  } finally {
    $(2);
  }
};
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    throw `exit`;
  } finally {
    $(2);
  }
  return undefined;
};
$(f);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  try {
    throw `exit`;
  } finally {
    $(2);
  }
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    throw "exit";
  }
finally {
    $( 2 );
  }
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
