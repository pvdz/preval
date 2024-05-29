# Preval test case

# caught_throw.md

> Try > Finally > Caught throw
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw 'testing'; // The finally should not trap this
  } catch {
    $('ok');
  }
} finally {
  $(2);
}
`````

## Pre Normal

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} finally {
  $(2);
}
`````

## Normalized

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} finally {
  $(2);
}
`````

## Output

`````js filename=intro
try {
  $(1);
  try {
    $();
    throw `testing`;
  } catch (e) {
    $(`ok`);
  }
} finally {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  $( 1 );
  try {
    $();
    throw "testing";
  }
catch (e) {
    $( "ok" );
  }
}
finally {
  $( 2 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 'ok'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
