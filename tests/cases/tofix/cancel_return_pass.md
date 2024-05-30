# Preval test case

# cancel_return_pass.md

> Tofix > Cancel return pass
>
> Just random things

#TODO

## Input

`````js filename=intro
function f() {
  hack: try {
    return 1;
  } finally {
    break hack; // Spoilers: does cancel the return
  }
  return 2;
}
$(f()); // 2
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  hack: try {
    return 1;
  } finally {
    break hack;
  }
  return 2;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  hack: {
    try {
      return 1;
    } finally {
      break hack;
    }
  }
  return 2;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: undefined
