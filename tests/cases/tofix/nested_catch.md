# Preval test case

# nested_catch.md

> Tofix > Nested catch
>
> Couple things;
> - If you know the catch is going to be triggered regardless (because the
>   block ends with a throw and there's no explicit abrupt completion
>   in the block otherwise) then you could argue that the catch block will
>   be executed regardless. If it's safe to do so you could move that code
>   to be after the catch block.
> - With the catch block empty you know that the catch clause is unused
> - That means the throw, if it ever triggers, doesn't observe the argument
> - (So you can replace that with undefined)
> - For the exception case of a try/catch with just an identifier statement
>   when the catch is empty, we should be able to safely remove the whole
>   thing because if it throws it'll be squashed and if it doesn't throw
>   then it still doesn't do antyhing.

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  try {
    fail_early;
    throw `one`;
  } catch (e) {
    x = 2;
  }
} catch ($finalImplicit) {}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
  try {
    fail_early;
    throw `one`;
  } catch (e) {
    x = 2;
  }
} catch ($finalImplicit) {}
$(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  fail_early;
  throw `one`;
} catch (e) {
  try {
    x = 2;
  } catch ($finalImplicit) {}
}
$(x);
`````

## Output

`````js filename=intro
try {
  fail_early;
  throw `one`;
} catch (e) {}
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  fail_early;
  throw "one";
}
catch (a) {

}
$( 2 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_early

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
