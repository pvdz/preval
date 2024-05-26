# Preval test case

# cancel_return_fail.md

> Tofix > Cancel return fail
>
> Just random things 

#TODO

## Input

`````js filename=intro
function f() {
  try {
    return 1;
  } finally {
    hack: break hack; // Spoilers: does not cancel the return
  }
  return 2;
}
$(f()); // 1
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
    return 1;
  } finally {
    hack: break hack;
  }
  return 2;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    return 1;
  } finally {
    return undefined;
  }
  return 2;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  try {
    return 1;
  } finally {
    return undefined;
  }
  return 2;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    return 1;
  }
finally {
    return undefined;
  }
  return 2;
};
const b = a();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: undefined
 - eval returned: undefined

Final output calls: BAD!!
 - 1: undefined
 - eval returned: undefined
