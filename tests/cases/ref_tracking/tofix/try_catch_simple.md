# Preval test case

# try_catch_simple.md

> Ref tracking > Tofix > Try catch simple
>
> 

#TODO

## Input

`````js filename=intro
let x = 1;
try { fail(); x = 2; } catch { x = 3 }
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
try {
  fail();
  x = 2;
} catch (e) {
  x = 3;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
try {
  fail();
  x = 2;
} catch (e) {
  x = 3;
}
$(x);
`````

## Output

`````js filename=intro
let x = 2;
try {
  fail();
} catch (e) {
  x = 3;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
try {
  fail();
}
catch (b) {
  a = 3;
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
